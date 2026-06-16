import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAdmin from "../../hooks/useAdmin";
import { CATEGORIES, getCategoryInfo } from "../../services/appsService";
import Button from "../../components/Button";
import Input from "../../components/Input";

const AdminApps = () => {
  const { apps, loading, handleDelete } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => apps.filter((a) => {
      const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || a.category === category;
      return matchesSearch && matchesCategory;
    }),
    [apps, search, category]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="section-heading">التطبيقات والبرامج</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {apps.length} عنصر إجمالًا
          </p>
        </div>
        <Button onClick={() => navigate("/admin/apps/new")} className="w-full sm:w-auto shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة تطبيق
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="w-full sm:max-w-sm">
          <Input
            placeholder="بحث بالاسم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">كل الأقسام</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        {loading && (
          <div className="text-center py-12 text-slate-400 text-sm">جاري التحميل...</div>
        )}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700">
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">التطبيق</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">القسم</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">السعر</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">إجراءات</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                <AnimatePresence>
                  {filtered.map((app, i) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={app.icon || "./icons/icon-96x96.png"}
                              alt={app.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-slate-800 dark:text-slate-100 line-clamp-1 max-w-[180px] sm:max-w-xs">
                            {app.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {getCategoryInfo(app.category).name}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        {app.isFree
                          ? <span className="font-semibold text-green-600 dark:text-green-400">مجاني</span>
                          : <span className="font-semibold text-brand-600 dark:text-brand-400">{app.price} $</span>
                        }
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-start gap-2">
                          <Button
                            size="xs"
                            variant="secondary"
                            onClick={() => navigate(`/admin/apps/${app.id}/edit`)}
                          >
                            تعديل
                          </Button>
                          <Button
                            size="xs"
                            variant="danger"
                            onClick={() => handleDelete(app.id)}
                          >
                            حذف
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            لا يوجد نتائج.{" "}
            <Link to="/admin/apps/new" className="text-brand-600 dark:text-brand-400 hover:underline">
              أضف تطبيق جديد
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminApps;
