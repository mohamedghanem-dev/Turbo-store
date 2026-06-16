import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const SHOP_LINKS = [
  { to: "/products",   label: "All Products" },
  { to: "/categories", label: "Categories"   },
  { to: "/deals",      label: "Deals & Offers" },
  { to: "/wishlist",   label: "Wishlist"     },
];

const SUPPORT_LINKS = [
  { to: "/faq",              label: "FAQ"              },
  { to: "/shipping-policy",  label: "Shipping Policy"  },
  { to: "/returns-policy",   label: "Returns & Refunds"},
  { to: "/contact",          label: "Contact Us"       },
];

const COMPANY_LINKS = [
  { to: "/about",            label: "About Us"         },
  { to: "/privacy-policy",   label: "Privacy Policy"   },
  { to: "/terms",            label: "Terms & Conditions"},
];

const SOCIAL = [
  {
    name: "Twitter/X",
    href: "#",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

const TRUST_BADGES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
    label: "Free Shipping",
    sub: "On orders over $50",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
      </svg>
    ),
    label: "Easy Returns",
    sub: "30-day return policy",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    label: "Secure Payment",
    sub: "SSL encrypted checkout",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    label: "24/7 Support",
    sub: "Always here to help",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("You're subscribed! Thanks for joining.");
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">

      {/* Trust Badges */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column (2 cols wide) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <img
                src="./icons/icon-48x48.png"
                alt="Nexus Arab Store"
                className="w-9 h-9 rounded-xl"
              />
              <span className="font-display text-lg font-bold text-white leading-tight">
                <span className="text-brand-500">Nexus</span> Arab
                <span className="block text-[10px] font-semibold tracking-widest text-slate-400 -mt-1">
                  STORE
                </span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              متجرك الأول لتطبيقات أندرويد، الألعاب المعدلة، برامج الكمبيوتر، والأنظمة الجاهزة (CRM) — كل ما تحتاجه في مكان واحد.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-10 px-3.5 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-brand-500 transition-colors"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-slate-600 mt-2">No spam, unsubscribe anytime.</p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Shop</h3>
            <ul className="flex flex-col gap-2.5">
              {SHOP_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="mt-6 flex flex-col gap-2">
              <a href="mailto:support@nexusarabstore.com" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                support@nexusarabstore.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Nexus Arab Store. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Payment methods */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Accepted:</span>
            {["Visa", "MC", "Amex", "PayPal"].map((card) => (
              <span key={card} className="px-2 py-0.5 bg-slate-800 rounded text-slate-400 text-[10px] font-medium">
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
