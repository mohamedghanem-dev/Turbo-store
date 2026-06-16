import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";
import Button from "../components/Button";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mb-6">
          <svg className="w-9 h-9 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="section-heading mb-3">Your wishlist is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xs">
          Save items you love by clicking the heart icon on any product.
        </p>
        <Link to="/products">
          <Button size="lg">Browse Products</Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading">My Wishlist</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{items.length} saved items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {items.map((item) => {
            const inCart = isInCart(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                className="card-base p-4 flex items-center gap-4"
              >
                <Link to={`/products/${item.id}`} className="shrink-0">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full object-contain"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`} className="hover:text-brand-600 transition-colors">
                    <h3 className="font-medium text-slate-800 dark:text-white line-clamp-2 text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </Link>
                  {item.category && (
                    <p className="text-xs text-slate-400 capitalize mt-1">{item.category}</p>
                  )}
                  <p className="text-base font-bold text-brand-600 dark:text-brand-400 mt-1">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant={inCart ? "secondary" : "primary"}
                    onClick={() => !inCart && addToCart({ id: item.id, image: item.image, title: item.title, price: item.price, category: item.category })}
                  >
                    {inCart ? "In Cart ✓" : "Add to Cart"}
                  </Button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
