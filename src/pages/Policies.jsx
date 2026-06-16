import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

const POLICIES = {
  "privacy-policy": {
    title: "Privacy Policy",
    icon: "🔒",
    lastUpdated: "January 1, 2025",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect information you provide directly, such as your name, email address, shipping address, and payment information when you create an account or place an order. We also collect usage data to improve our services.",
      },
      {
        heading: "How We Use Your Information",
        body: "We use your information to process orders, send transactional emails, provide customer support, and improve our platform. We never sell your personal data to third parties.",
      },
      {
        heading: "Data Security",
        body: "All data is transmitted over HTTPS. Payment information is handled by PCI-DSS compliant processors and never stored on our servers.",
      },
      {
        heading: "Cookies",
        body: "We use essential cookies to keep you logged in and remember your cart. We may use analytics cookies to understand how our site is used. You can opt out in your browser settings.",
      },
      {
        heading: "Contact",
        body: "For privacy-related questions, email us at privacy@turbostore.com.",
      },
    ],
  },
  "terms": {
    title: "Terms & Conditions",
    icon: "📄",
    lastUpdated: "January 1, 2025",
    sections: [
      {
        heading: "Acceptance of Terms",
        body: "By using TurboStore, you agree to these Terms & Conditions. If you do not agree, please do not use our services.",
      },
      {
        heading: "Account Responsibilities",
        body: "You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account.",
      },
      {
        heading: "Purchases & Payments",
        body: "All prices are listed in USD. We reserve the right to modify pricing at any time. Your order is confirmed when you receive an order confirmation email.",
      },
      {
        heading: "Intellectual Property",
        body: "All content on TurboStore — including images, text, logos, and design — is our property and protected by copyright law.",
      },
      {
        heading: "Limitation of Liability",
        body: "TurboStore is not liable for indirect, incidental, or consequential damages arising from your use of our services.",
      },
    ],
  },
  "returns-policy": {
    title: "Returns & Refunds",
    icon: "🔄",
    lastUpdated: "January 1, 2025",
    sections: [
      {
        heading: "30-Day Return Window",
        body: "You may return most items within 30 days of delivery for a full refund, provided they are in original, unused condition with all original packaging.",
      },
      {
        heading: "How to Initiate a Return",
        body: "Go to your Orders page, select the item you wish to return, and follow the prompts. We'll email you a prepaid return label.",
      },
      {
        heading: "Refund Processing",
        body: "Refunds are processed within 3-5 business days after we receive your return. Funds appear within 5-10 business days depending on your payment method.",
      },
      {
        heading: "Non-Returnable Items",
        body: "Items marked as 'Final Sale', digital products, and perishable goods are not eligible for return.",
      },
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    icon: "🚚",
    lastUpdated: "January 1, 2025",
    sections: [
      {
        heading: "Processing Times",
        body: "Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays are processed the next business day.",
      },
      {
        heading: "Delivery Options",
        body: "Standard Shipping (3-5 business days) is free on orders over $50. Express Shipping (1-2 business days) is available for an additional fee at checkout.",
      },
      {
        heading: "Order Tracking",
        body: "Once your order ships, you'll receive a tracking number via email. Track your order on our website or the carrier's site.",
      },
      {
        heading: "International Shipping",
        body: "We ship to the US, Canada, UK, and Australia. International orders may be subject to customs fees, which are the buyer's responsibility.",
      },
    ],
  },
};

const PolicyPage = () => {
  const { policy } = useParams();
  const data = POLICIES[policy];

  if (!data) return <NotFound />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-2xl">
            {data.icon}
          </div>
          <div>
            <h1 className="section-heading">{data.title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">Last updated: {data.lastUpdated}</p>
          </div>
        </div>

        <div className="card-base divide-y divide-slate-100 dark:divide-slate-800">
          {data.sections.map(({ heading, body }, i) => (
            <div key={heading} className="p-6">
              <h2 className="text-base font-semibold text-slate-800 dark:text-white mb-2">
                {i + 1}. {heading}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
          Questions about our policies?{" "}
          <Link to="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">Contact us</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default PolicyPage;
