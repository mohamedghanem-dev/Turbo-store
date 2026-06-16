import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppCard from "../components/AppCard";
import SkeletonCard from "../components/SkeletonCard";
import useAdmin from "../hooks/useAdmin";
import useDebounce from "../hooks/useDebounce";
import { CATEGORIES } from "../services/appsService";

const SORT_OPTIONS = [
  { value: "default",  label: "الأحدث" },
  { value: "free",      label: "المجاني أولًا" },
  { value: "paid",      label: "المدفوع أولًا" },
  { value: "name-asc",  label: "الاسم: أ ← ي" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { apps: allApps, loading } = useAdmin();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (selectedCategory !== "all") params.category = selectedCategory;
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategory, setSearchParams]);

  const filteredApps = useMemo(() => {
    let result = [...allApps];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    switch (sortBy) {
      case "free":     result.sort((a, b) => (b.isFree ? 1 : 0) - (a.isFree ? 1 : 0)); break;
      case "paid":     result.sort((a, b) => (a.isFree ? 1 : 0) - (b.isFree ? 1 : 0)); break;
      case "name-asc": result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return result;
  }, [allApps, debouncedSearch, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredApps.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApps.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredApps, currentPage]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || sortBy !== "default";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="section-heading">كل التطبيقات والبرامج</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {loading ? "جاري التحميل..." : `${filteredApps.length} عنصر`}
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
            ${showFilters
              ? "bg-brand-50 dark:bg-brand-950 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            }
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          الفلاتر {hasActiveFilters && <span className="w-2 h-2 bg-brand-600 rounded-full" />}
        </button>
      </div>

      <div className="flex gap-6">

        {/* ── SIDEBAR ─────────────────────────────── */}
        <aside
          className={`
            shrink-0
            w-full sm:w-64
            ${showFilters ? "block" : "hidden"} sm:block
          `}
        >
          <div className="card-base p-5 sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                البحث
              </label>
              <div className="relative">
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث عن تطبيق..."
                  className="w-full h-10 pr-9 pl-3.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                القسم
              </label>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all text-right ${
                    selectedCategory === "all"
                      ? "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  الكل
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all text-right ${
                      selectedCategory === cat.slug
                        ? "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                الترتيب
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 px-3.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white outline-none focus:border-brand-500 transition-colors appearance-none cursor-pointer"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-red-300 dark:hover:border-red-800 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                إعادة ضبط الفلاتر
              </button>
            )}
          </div>
        </aside>

        {/* ── GRID ──────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty */}
          {!loading && filteredApps.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                لا يوجد نتائج
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs">
                جرّب تعديل كلمة البحث أو إزالة بعض الفلاتر.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-all"
              >
                إعادة ضبط كل الفلاتر
              </button>
            </motion.div>
          )}

          {/* Apps grid */}
          {!loading && filteredApps.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {paginatedApps.map((app, i) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.35 }}
                    >
                      <AppCard
                        id={app.id}
                        icon={app.icon}
                        title={app.title}
                        category={app.category}
                        isFree={app.isFree}
                        price={app.price}
                        description={app.description}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    السابق
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                        page === currentPage
                          ? "bg-brand-600 text-white"
                          : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    التالي
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
