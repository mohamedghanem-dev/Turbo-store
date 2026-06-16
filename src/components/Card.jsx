import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = 5 - Math.ceil(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {partial >= 0.5 && (
        <svg key="half" className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="w-3.5 h-3.5 text-slate-200 dark:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CATEGORY_COLORS = {
  electronics: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  clothing:    "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400",
  accessories: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  jewelery:    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
};

const Card = ({ id, image, title, price, rating, category, originalPrice }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(id);
  const inWishlist = isInWishlist(id);
  const discountPct = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, image, title, price, category });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist({ id, image, title, price, category, rating });
  };

  const categoryColor =
    CATEGORY_COLORS[category?.toLowerCase()] ||
    "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";

  return (
    <article
      className="
        group relative flex flex-col
        bg-white dark:bg-slate-800
        rounded-2xl overflow-hidden
        shadow-card hover:shadow-card-hover
        border border-slate-100 dark:border-slate-700/60
        transition-all duration-300 ease-out
        cursor-pointer
        hover:-translate-y-1
      "
      onClick={() => navigate(`/products/${id}`)}
      aria-label={`View ${title}`}
    >
      {/* Discount badge */}
      {discountPct && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discountPct}%
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`
          absolute top-3 right-3 z-10
          w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-200
          ${inWishlist
            ? "bg-red-500 text-white shadow-md"
            : "bg-white/90 dark:bg-slate-700/90 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 shadow-sm"
          }
        `}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image area */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 aspect-square">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            absolute inset-0 w-full h-full object-contain p-5
            group-hover:scale-110 transition-transform duration-500 ease-out
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {category && (
          <span className={`badge ${categoryColor} self-start`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        )}

        <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-2 leading-snug min-h-[2.5rem]">
          {title}
        </h3>

        {rating && (
          <div className="flex items-center gap-1.5">
            <StarRating rating={rating} />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {rating}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 gap-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-brand-600 dark:text-brand-400">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={inCart ? "Already in cart" : "Add to cart"}
            className={`
              shrink-0 h-8 px-3 rounded-xl text-xs font-semibold
              transition-all duration-200 active:scale-95
              ${inCart
                ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 cursor-default"
                : "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-sm"
              }
            `}
          >
            {inCart ? (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
