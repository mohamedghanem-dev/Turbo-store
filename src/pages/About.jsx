import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TEAM = [
  { name: "Alex Johnson", role: "Founder & CEO",        emoji: "👨‍💼" },
  { name: "Sarah Chen",   role: "Head of Design",       emoji: "👩‍🎨" },
  { name: "Mike Torres",  role: "Lead Engineer",        emoji: "👨‍💻" },
  { name: "Emma Davis",   role: "Customer Experience",  emoji: "👩‍💼" },
];

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Listed" },
  { value: "99%",  label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const About = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    {/* Hero */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <span className="badge bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 mb-4">
        Our Story
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
        We believe in better shopping
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        TurboStore was founded with a simple mission: make premium products accessible to everyone,
        with an experience that feels effortless and enjoyable.
      </p>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
      {STATS.map(({ value, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-base p-6 text-center"
        >
          <p className="font-display text-3xl font-extrabold text-brand-600 dark:text-brand-400 mb-1">{value}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        </motion.div>
      ))}
    </div>

    {/* Mission */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="section-heading mb-4">Our Mission</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          We started TurboStore because we believed the online shopping experience could be better —
          more personal, more trustworthy, and more enjoyable.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Today, we serve thousands of customers with a handpicked catalog of electronics,
          fashion, accessories, and jewelry — all backed by our quality guarantee and
          exceptional customer support.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl transition-all active:scale-95 text-sm shadow-brand-sm"
        >
          Start Shopping
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-brand-gradient rounded-3xl p-8 text-white"
      >
        {[
          { icon: "🎯", text: "Carefully curated products from trusted suppliers worldwide" },
          { icon: "🚀", text: "Fast, reliable shipping with real-time order tracking" },
          { icon: "💬", text: "A support team that actually cares about your experience" },
          { icon: "🔒", text: "100% secure payments with buyer protection guarantee" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-3 mb-4 last:mb-0">
            <span className="text-2xl shrink-0">{icon}</span>
            <p className="text-white/90 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </motion.div>
    </div>

    {/* Team */}
    <div>
      <h2 className="section-heading text-center mb-8">Meet the Team</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {TEAM.map(({ name, role, emoji }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="card-base p-6 text-center"
          >
            <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
              {emoji}
            </div>
            <p className="font-semibold text-slate-800 dark:text-white text-sm">{name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
