import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAppById, getCategoryInfo } from "../services/appsService";
import Loader from "../components/Loader";
import Button from "../components/Button";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "201095097334";
const PLACEHOLDER_ICON = "./icons/icon-192x192.png";

const getYouTubeEmbed = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    fetchAppById(id)
      .then((data) => { if (active) setApp(data); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <Loader fullPage />;

  if (error || !app) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">التطبيق غير موجود</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">قد يكون تم حذفه أو الرابط غير صحيح.</p>
        <Link to="/products" className="text-brand-600 dark:text-brand-400 hover:underline">
          تصفح كل التطبيقات
        </Link>
      </div>
    );
  }

  const cat = getCategoryInfo(app.category);
  const embedUrl = getYouTubeEmbed(app.demoVideoUrl);
  const screenshots = app.screenshots || [];

  const whatsappMessage = encodeURIComponent(
    `مرحبًا، أنا مهتم بشراء "${app.title}" من Nexus Arab Store 🛒`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-5 flex items-center gap-1.5">
        <Link to="/" className="hover:text-brand-500">الرئيسية</Link>
        <span>/</span>
        <Link to={`/products?category=${app.category}`} className="hover:text-brand-500">{cat.name}</Link>
        <span>/</span>
        <span className="text-slate-600 dark:text-slate-300 line-clamp-1">{app.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-5 items-start mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0 shadow-card">
          <img
            src={app.icon || PLACEHOLDER_ICON}
            alt={app.title}
            onError={(e) => { e.target.src = PLACEHOLDER_ICON; }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="badge bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mb-2">
            {cat.name}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
            {app.title}
          </h1>

          <div className="flex items-center gap-3">
            {app.isFree ? (
              <span className="text-lg font-bold text-green-600 dark:text-green-400">مجاني</span>
            ) : (
              <span className="text-lg font-bold text-brand-600 dark:text-brand-400">{app.price} $</span>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {app.isFree ? (
          (app.downloadLinks || []).map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="lg" className="w-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                {(app.downloadLinks.length > 1) ? `تحميل (رابط ${i + 1})` : "تحميل مباشر"}
              </Button>
            </a>
          ))
        ) : (
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="lg" className="w-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.347-.347.521-.521.174-.174.273-.347.397-.621.149-.297.297-.595.297-.892 0-.297-.149-.595-.297-.892-.149-.297-.347-.346-.52-.346-.198 0-.397.025-.595.025-.198 0-.521.074-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.075.149.198 2.057 3.143 4.99 4.282 2.932 1.139 2.932.759 3.46.71.529-.05 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.273-.198-.57-.347z" />
              </svg>
              شراء عبر واتساب
            </Button>
          </a>
        )}
      </div>

      {/* Screenshots carousel */}
      {screenshots.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-3">صور من التطبيق</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
            {screenshots.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="shrink-0 snap-start rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 w-40 h-72 sm:w-48 sm:h-80"
              >
                <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Demo video */}
      {embedUrl && (
        <div className="mb-8">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-3">فيديو توضيحي</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <iframe
              src={embedUrl}
              title="Demo video"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <h2 className="font-semibold text-slate-800 dark:text-white mb-3">الوصف</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {app.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AppDetails;
