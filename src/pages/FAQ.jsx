import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const FAQS = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available at checkout. Free standard shipping on all orders over $50.",
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time on our Orders page.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we ship to the US, Canada, UK, and Australia. We're expanding to more countries soon.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day hassle-free return policy. Items must be in original condition and packaging. Simply initiate a return from your Orders page.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 3-5 business days after we receive your return. The funds will appear in your account within 5-10 business days depending on your bank.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We never store your full card details. All payments are processed through our PCI-DSS compliant payment provider.",
      },
    ],
  },
  {
    category: "Account & Profile",
    items: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign Up' in the top navigation. You can register with your email or continue as a guest for checkout.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click 'Login', then 'Forgot Password'. Enter your email and we'll send a reset link within a few minutes.",
      },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-slate-800 dark:text-white">{q}</span>
        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
      <h1 className="section-heading mb-3">Frequently Asked Questions</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        Can't find what you're looking for?{" "}
        <Link to="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">Contact us</Link>
      </p>
    </motion.div>

    <div className="space-y-6">
      {FAQS.map(({ category, items }, i) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-base overflow-hidden"
        >
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{category}</h2>
          </div>
          <div className="px-6">
            {items.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default FAQ;
