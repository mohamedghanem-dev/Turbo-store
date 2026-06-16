import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppCard from "../components/AppCard";
import SkeletonCard from "../components/SkeletonCard";
import useAdmin from "../hooks/useAdmin";
import { CATEGORIES } from "../services/appsService";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "201095097334";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
    title: "تحميل مباشر وآمن",
    desc: "روابط مباشرة موثوقة وآمنة",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "تطبيقات أمنة ومفحوصة",
    desc: "كل تطبيق يتم فحصه قبل النشر",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    ),
    title: "دعم عبر واتساب",
    desc: "تواصل معنا في أي وقت",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "تحديثات مستمرة",
    desc: "إضافة تطبيقات وإصدارات جديدة يوميًا",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { apps, loading } = useAdmin();

  const featured = apps.slice(0, 8);

  // Group apps by category for the "featured per section" layout
  const freeApps  = apps.filter((a) => a.isFree).slice(0, 4);
  const paidApps  = apps.filter((a) => !a.isFree).slice(0, 4);

  return (
    <div className="w-full -mt-6 sm:-mt-8" dir="rtl">

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-dark min-h-[420px] sm:min-h-[500px] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-800/20 rounded-full blur-3xl" />
        </div>

        {/* Hero image area (decorative grid of app icons) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-8 right-8 w-16 h-16 rounded-2xl bg-white/20 rotate-12" />
          <div className="absolute top-24 right-32 w-10 h-10 rounded-xl bg-brand-400/40 -rotate-6" />
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-2xl bg-white/10 rotate-3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-2xl">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-900/60 text-brand-300 text-xs font-semibold rounded-full mb-5 border border-brand-700/50">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                تطبيقات وألعاب وأدوات ومزيد
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5"
            >
              متجر تطبيقات
              <br />
              <span className="text-brand-400">وبرامج شامل</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-lg"
            >
              اكتشف آلاف التطبيقات والبرامج الأمنة والمجانية.
              سواء للأندرويد أو الكمبيوتر. كل ما تحتاجه في جنية واحد.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl shadow-brand hover:shadow-brand transition-all duration-200 active:scale-95 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                تصفح التطبيقات والبرامج
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all duration-200 active:scale-95 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                تواصل معنا
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES (Circular Icons) ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block w-1 h-5 bg-brand-600 rounded-full ml-2 align-middle" />
            <h2 className="section-heading inline">أقسام المتجر</h2>
          </div>
          <Link to="/categories" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            كل الأقسام
            <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map(({ slug, name, icon }, i) => (
            <motion.button
              key={slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              onClick={() => navigate(`/products?category=${slug}`)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-brand-400 group-hover:shadow-brand-sm transition-all duration-200 shrink-0">
                <img
                  src={icon}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 text-center leading-tight line-clamp-2">
                {name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ─── FEATURED APPS ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block w-1 h-5 bg-brand-600 rounded-full ml-2 align-middle" />
            <h2 className="section-heading inline">تطبيقات مميزة</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            عرض الكل
            <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
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
          </div>
        )}

        {!loading && featured.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            لا يوجد تطبيقات بعد — سيتم إضافتها قريبًا.
          </div>
        )}
      </section>

      {/* ─── FREE APPS ────────────────────────────── */}
      {!loading && freeApps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="inline-block w-1 h-5 bg-green-500 rounded-full ml-2 align-middle" />
              <h2 className="section-heading inline">تطبيقات مجانية</h2>
            </div>
            <Link to="/products?category=android-apps" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              عرض الكل
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {freeApps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
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
          </div>
        </section>
      )}

      {/* ─── PAID/SYSTEMS APPS ────────────────────── */}
      {!loading && paidApps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="inline-block w-1 h-5 bg-amber-500 rounded-full ml-2 align-middle" />
              <h2 className="section-heading inline">أنظمة وبرامج CRM</h2>
            </div>
            <Link to="/products?category=systems-crm" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              عرض الكل
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paidApps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
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
          </div>
        </section>
      )}

      {/* ─── WHATSAPP CTA BANNER ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111] to-[#1a0505] border border-brand-900/40 text-white px-6 sm:px-12 py-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                هل تبحث عن تطبيق معين؟
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                تواصل معنا على واتساب وسنساعدك في إيجاد أي تطبيق أو برنامج تحتاجه، أو طلب نسخة مخصصة.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحبًا، أريد الاستفسار عن تطبيق من Nexus Arab Store 👋")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold rounded-2xl transition-all active:scale-95 shrink-0 text-sm shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
