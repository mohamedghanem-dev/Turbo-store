import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import useAdmin from "../hooks/useAdmin";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const CATEGORIES = [
  { name: "Electronics", slug: "electronics", color: "from-blue-600 to-blue-800" },
  { name: "Clothing",    slug: "clothing",    color: "from-pink-500 to-rose-600"   },
  { name: "Accessories", slug: "accessories", color: "from-amber-500 to-orange-600"},
  { name: "Jewelry",     slug: "jewelery",    color: "from-purple-500 to-violet-700"},
  { name: "Bicycles",    slug: "bicycles",    color: "from-green-500 to-emerald-700"},
  { name: "Watches",     slug: "watches",     color: "from-slate-600 to-slate-800"},
  { name: "Toys",        slug: "toys",        color: "from-yellow-500 to-amber-600"},
  { name: "Swimming",    slug: "swimming",    color: "from-cyan-500 to-blue-700"},
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
    title: "Free Shipping",
    desc: "On all orders over $50",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: "Secure Payments",
    desc: "100% safe & encrypted",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
      </svg>
    ),
    title: "Easy Returns",
    desc: "30-day return policy",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    title: "24/7 Support",
    desc: "We're always available",
  },
];

const HERO_PRODUCTS = [
  { src: "/images/headphones.webp", label: "Headphones" },
  { src: "/images/harddrive.webp",  label: "Storage"    },
  { src: "/images/backpack.webp",   label: "Backpack"   },
];

const Home = () => {
  const navigate = useNavigate();
  const { products } = useAdmin();

  const loading = products.length === 0;
  const featured = products.slice(0, 8);

  return (
    <div className="w-full -mt-6 sm:-mt-8">

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-light dark:bg-hero-dark min-h-[480px] sm:min-h-[540px] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-400/20 dark:bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div>
              <motion.div {...fadeUp(0)}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-semibold rounded-full mb-6">
                  <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                  New Collection Available
                </span>
              </motion.div>

              <motion.h1
                {...fadeUp(0.1)}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6"
              >
                Discover{" "}
                <span className="gradient-text">Premium</span>
                <br />
                Products
              </motion.h1>

              <motion.p
                {...fadeUp(0.2)}
                className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-lg"
              >
                Shop the finest selection of electronics, fashion, and accessories.
                Quality guaranteed — delivered to your door.
              </motion.p>

              <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl shadow-brand hover:shadow-brand transition-all duration-200 active:scale-95 text-sm"
                >
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 active:scale-95 text-sm shadow-card"
                >
                  Browse Categories
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.4)} className="flex items-center gap-6 mt-10">
                {[
                  { value: "10K+", label: "Products"  },
                  { value: "50K+", label: "Customers" },
                  { value: "4.9★", label: "Rating"    },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero product images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:grid grid-cols-3 gap-4"
            >
              {HERO_PRODUCTS.map(({ src, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={`bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-slate-100 dark:border-slate-700/50 p-4 flex flex-col items-center gap-2 ${i === 1 ? "mt-6" : ""}`}
                >
                  <img src={src} alt={label} className="w-full aspect-square object-contain" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
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

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Shop by Category</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Browse our curated collections</p>
          </div>
          <Link to="/categories" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            All categories
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map(({ name, slug, color }, i) => (
            <motion.button
              key={slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              onClick={() => navigate(`/products?category=${slug}`)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
              <span className="relative text-sm font-bold text-white">{name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Featured Products</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Handpicked just for you</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            View all
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Card
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating?.rate}
                  category={product.category}
                />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && featured.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-500 font-semibold rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-950 transition-all active:scale-95"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative overflow-hidden rounded-3xl bg-dark-gradient text-white px-6 sm:px-12 py-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full mb-4">
              🔥 Limited Time Offer
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Get 20% off your first order
            </h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Use code <code className="bg-white/10 px-2 py-0.5 rounded font-mono text-white font-bold">WELCOME20</code> at checkout.
              Valid for new customers only.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95 text-sm"
            >
              Claim Discount
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
