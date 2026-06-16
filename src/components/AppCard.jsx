import { useNavigate } from "react-router-dom";
import { getCategoryInfo } from "../services/appsService";

const PLACEHOLDER_ICON = "./icons/icon-192x192.png";

const AppCard = ({ id, icon, title, category, isFree, price, description }) => {
  const navigate = useNavigate();
  const cat = getCategoryInfo(category);

  return (
    <article
      onClick={() => navigate(`/apps/${id}`)}
      className="
        group relative flex flex-col
        bg-white dark:bg-slate-800
        rounded-2xl overflow-hidden
        shadow-card hover:shadow-card-hover
        border border-slate-100 dark:border-slate-700/60
        transition-all duration-300 ease-out
        cursor-pointer
        hover:-translate-y-1
        p-4
      "
      aria-label={`View ${title}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
          <img
            src={icon || PLACEHOLDER_ICON}
            alt={title}
            loading="lazy"
            onError={(e) => { e.target.src = PLACEHOLDER_ICON; }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1 leading-snug">
            {title}
          </h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {cat.name}
          </span>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        {isFree ? (
          <span className="badge bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
            مجاني
          </span>
        ) : (
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
            {price} $
          </span>
        )}

        <span
          className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
            transition-all duration-200
            ${isFree
              ? "bg-brand-600 group-hover:bg-brand-700 text-white shadow-brand-sm"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            }
          `}
        >
          {isFree ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              تحميل
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.347-.347.521-.521.174-.174.273-.347.397-.621.149-.297.297-.595.297-.892 0-.297-.149-.595-.297-.892-.149-.297-.347-.346-.52-.346-.198 0-.397.025-.595.025-.198 0-.521.074-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.075.149.198 2.057 3.143 4.99 4.282 2.932 1.139 2.932.759 3.46.71.529-.05 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.273-.198-.57-.347z" />
              </svg>
              شراء
            </>
          )}
        </span>
      </div>
    </article>
  );
};

export default AppCard;
