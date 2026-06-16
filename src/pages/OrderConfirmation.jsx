import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.orderNumber) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state?.orderNumber) return null;

  const { orderNumber, totalItems, totalPrice } = state;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="card-base shadow-elevated p-8 sm:p-10 text-center">

          {/* Success icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
            className="w-20 h-20 bg-brand-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-brand"
          >
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          {/* Heading */}
          <h1 className="section-heading mb-2">Order Confirmed!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mb-8">
            Thank you for your purchase. Your order is being processed.
          </p>

          {/* Order details */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 mb-6 text-left">

            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
              <span className="text-sm text-slate-500 dark:text-slate-400">Order Number</span>
              <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{orderNumber}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
              <span className="text-sm text-slate-500 dark:text-slate-400">Total Items</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{totalItems}</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Total Paid</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">${totalPrice}</span>
            </div>

          </div>

          {/* Footer note */}
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
            A confirmation email will be sent to your inbox.
          </p>

          {/* CTA */}
          <Button size="lg" onClick={() => navigate("/products")} className="w-full">
            Continue Shopping
          </Button>

        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
