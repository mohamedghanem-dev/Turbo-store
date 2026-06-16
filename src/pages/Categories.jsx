import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Phones, laptops, TVs, tablets, headphones, and gaming",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    count: "90+ products",
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Shirts, jackets, shoes, and everyday fashion",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    count: "15+ products",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Bags, backpacks, belts, and lifestyle accessories",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    count: "5+ products",
  },
  {
    name: "Jewelry",
    slug: "jewelery",
    description: "Rings, necklaces, bracelets, and premium jewelry",
    color: "from-purple-500 to-violet-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    count: "30+ products",
  },
  {
    name: "Bicycles",
    slug: "bicycles",
    description: "Bikes for every rider, from casual to performance",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    count: "8+ products",
  },
  {
    name: "Watches",
    slug: "watches",
    description: "Smart and classic watches for every style",
    color: "from-slate-500 to-gray-600",
    bg: "bg-slate-50 dark:bg-slate-900/20",
    count: "10+ products",
  },
  {
    name: "Toys",
    slug: "toys",
    description: "Fun toys, cars, planes, and games for all ages",
    color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    count: "17+ products",
  },
  {
    name: "Swimming",
    slug: "swimming",
    description: "Swimming gear and pool accessories",
    color: "from-cyan-500 to-teal-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    count: "5+ products",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="section-heading">Shop by Category</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Explore our curated collections
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map(({ name, slug, description, color, bg, count }, i) => (
          <motion.button
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            onClick={() => navigate(`/products?category=${slug}`)}
            className="group text-left card-base overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-card-hover"
          >
            {/* Top gradient */}
            <div className={`h-28 bg-gradient-to-br ${color} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
              <span className="text-3xl font-display font-bold text-white/90 relative group-hover:scale-110 transition-transform duration-300">
                {name}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{description}</p>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400">{count} →</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
