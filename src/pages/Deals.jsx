import { useCallback } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import useFetch from "../hooks/useFetch";
import { getAllProducts } from "../services/productService";
import useAdmin from "../hooks/useAdmin";

const Deals = () => {
  const { products: adminProducts } = useAdmin();
  const fetchFn = useCallback(() => getAllProducts(), []);
  const { loading } = useFetch(fetchFn);

  const all = adminProducts.length > 0 ? adminProducts : [];
  const deals = all.filter((_, i) => i % 2 === 0).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header banner */}
      <div className="relative overflow-hidden bg-dark-gradient rounded-3xl px-6 sm:px-10 py-10 mb-10 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-0 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-full mb-3">
            🔥 Flash Sale — Today Only
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-2">Deals & Offers</h1>
          <p className="text-slate-300 text-sm max-w-md">
            Save up to 40% on selected items. Use code{" "}
            <code className="bg-white/10 px-2 py-0.5 rounded font-mono text-white font-bold">SAVE20</code>{" "}
            for an extra 20% off.
          </p>
        </div>
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : deals.length === 0 ? (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
          No deals available right now. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <Card
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating?.rate}
                category={product.category}
                originalPrice={parseFloat((product.price * 1.25).toFixed(2))}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;
