import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="w-24 h-24 bg-brand-50 dark:bg-brand-900/20 rounded-3xl flex items-center justify-center mx-auto">
          <span className="text-5xl">🔍</span>
        </div>

        <div>
          <h1 className="font-display text-7xl font-extrabold text-brand-200 dark:text-brand-900 mb-2">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Page not found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            ← Go Back
          </button>
          <Link
            to="/"
            className="px-5 py-2.5 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all shadow-brand-sm"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
