import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../hooks/useCart";
import Button from "../components/Button";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 rounded-3xl flex items-center justify-center mb-6">
          <svg className="w-9 h-9 text-brand-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="section-heading mb-3">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xs">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link to="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </motion.div>
    );
  }

  const shipping = totalPrice >= 50 ? 0 : 4.99;
  const tax = parseFloat((totalPrice * 0.08).toFixed(2));
  const orderTotal = parseFloat((totalPrice + shipping + tax).toFixed(2));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading">Shopping Cart</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{totalItems} items</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ duration: 0.2 }}
                className="card-base p-4 flex items-center gap-4"
              >
                {/* Image */}
                <Link to={`/products/${item.id}`} className="shrink-0">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <img src={item.image} alt={item.title} className="max-h-full object-contain" loading="lazy" />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-2 hover:text-brand-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  {item.category && (
                    <p className="text-xs text-slate-400 capitalize mt-0.5">{item.category}</p>
                  )}
                  <p className="text-base font-bold text-brand-600 dark:text-brand-400 mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Qty + Remove */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-card text-sm font-medium"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-slate-800 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-card text-sm font-medium"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card-base p-6 sticky top-24 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 dark:text-green-400 font-medium" : ""}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span className="text-brand-600 dark:text-brand-400">${orderTotal.toFixed(2)}</span>
            </div>

            <Button size="lg" fullWidth onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>

            <Link
              to="/products"
              className="flex items-center justify-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
