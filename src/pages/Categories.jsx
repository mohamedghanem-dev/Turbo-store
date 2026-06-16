import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES } from "../services/appsService";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      <div className="mb-8">
        <h1 className="section-heading">أقسام المتجر</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          اختر القسم الذي تبحث عنه
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {CATEGORIES.map(({ name, nameEn, slug, icon, color }, i) => (
          <motion.button
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => navigate(`/products?category=${slug}`)}
            className="group text-right card-base overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-card-hover"
          >
            {/* Top gradient */}
            <div className={`h-28 bg-gradient-to-br ${color} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 bg-white/10">
                <img
                  src={icon}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{nameEn}</p>
              <div className="flex items-center gap-1 mt-3 text-brand-600 dark:text-brand-400">
                <span className="text-xs font-medium">تصفح</span>
                <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
