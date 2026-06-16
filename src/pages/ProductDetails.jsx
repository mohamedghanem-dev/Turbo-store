import { useParams, useNavigate, Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { getProductById } from "../services/productService";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import Loader from "../components/Loader";
import Button from "../components/Button";

const StarRow = ({ rating, count }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-amber-400" : "text-slate-200 dark:text-slate-600"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{rating}</span>
    <span className="text-sm text-slate-400">({count} reviews)</span>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  const fetchProduct = useCallback(() => getProductById(id), [id]);
  const { data: product, loading, error } = useFetch(fetchProduct, [id]);

  if (loading) return <Loader fullPage />;

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-4">
          {error ? "⚠️" : "🔍"}
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          {error ? "Something went wrong" : "Product Not Found"}
        </h2>
        <p className="text-slate-500 text-sm mb-6">{error || "The product you're looking for doesn't exist."}</p>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, category: product.category });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link to="/products" className="hover:text-brand-600 transition-colors">Products</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-slate-800 dark:text-white font-medium line-clamp-1 max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
          <div className="relative group bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
            <img src={product.image} alt={product.title} className="max-h-[420px] max-w-[420px] w-full h-full object-contain p-10 group-hover:scale-105 transition-transform duration-500" />
            <button
              onClick={() => toggleWishlist({ id: product.id, image: product.image, title: product.title, price: product.price, category: product.category, rating: product.rating })}
              className={`absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-elevated ${inWishlist ? "bg-red-500 text-white" : "bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500"}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-5">
          {product.category && (
            <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 self-start capitalize">{product.category}</span>
          )}

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">{product.title}</h1>

          {product.rating && <StarRow rating={product.rating.rate} count={product.rating.count} />}

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-600 dark:text-brand-400">${product.price}</span>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full">In Stock</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{product.description}</p>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity:</span>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-card font-medium">−</button>
              <span className="w-8 text-center text-sm font-semibold text-slate-800 dark:text-white">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-card font-medium">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={handleAddToCart} className="flex-1"
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            >{inCart ? "Added to Cart ✓" : "Add to Cart"}</Button>

            <Button size="lg" variant="secondary" onClick={() => navigate("/products")}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>}
            >Back</Button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { icon: "🚚", label: "Free shipping over $50" },
              { icon: "🔄", label: "30-day returns" },
              { icon: "🔒", label: "Secure checkout" },
              { icon: "⭐", label: "Quality guaranteed" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
