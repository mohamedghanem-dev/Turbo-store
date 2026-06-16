import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SAMPLE_ORDERS = [
  {
    id: "ORD-7823",
    date: "May 20, 2026",
    status: "Delivered",
    total: 124.97,
    items: [
      { title: "Wireless Bluetooth Headphones", qty: 1, price: 79.99 },
      { title: "Phone Stand & Holder", qty: 2, price: 22.49 },
    ],
  },
  {
    id: "ORD-7761",
    date: "May 15, 2026",
    status: "Shipped",
    total: 249.0,
    items: [{ title: "Mechanical Keyboard TKL", qty: 1, price: 249.0 }],
  },
  {
    id: "ORD-7698",
    date: "May 10, 2026",
    status: "Processing",
    total: 59.95,
    items: [
      { title: "Ergonomic Mouse Pad XL", qty: 1, price: 34.99 },
      { title: "USB-C Hub 7-in-1", qty: 1, price: 24.96 },
    ],
  },
];

const STATUS_BADGE = {
  Delivered:
    "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  Shipped:
    "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400",
  Processing:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
};

const STATUS_DOT = {
  Delivered: "bg-emerald-500",
  Shipped: "bg-brand-500",
  Processing: "bg-amber-400",
};

const Orders = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
  >
    <div className="mb-8">
      <h1 className="section-heading">My Orders</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
        {SAMPLE_ORDERS.length} orders placed
      </p>
    </div>

    <div className="space-y-4">
      {SAMPLE_ORDERS.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="card-base overflow-hidden"
        >
          {/* Order header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white text-sm">
                {order.id}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{order.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`badge ${STATUS_BADGE[order.status]}`}>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[order.status]}`}
                />
                {order.status}
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Line items */}
          <ul className="px-5 py-3.5 space-y-2">
            {order.items.map((item, j) => (
              <li
                key={j}
                className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="line-clamp-1 pr-4">
                  {item.qty > 1 && (
                    <span className="text-slate-400 mr-1">{item.qty}×</span>
                  )}
                  {item.title}
                </span>
                <span className="shrink-0 font-medium text-slate-700 dark:text-slate-300">
                  ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <Link
              to="/products"
              className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
            >
              Buy again
            </Link>
            <p className="text-xs text-slate-400">
              Total:{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ${order.total.toFixed(2)}
              </span>
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Orders;
