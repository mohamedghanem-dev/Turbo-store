const VARIANTS = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-brand-sm hover:shadow-brand focus:ring-2 focus:ring-brand-400 focus:ring-offset-2",
  secondary:
    "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
  outline:
    "bg-transparent border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 focus:ring-2 focus:ring-brand-400 focus:ring-offset-2",
  ghost:
    "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-2 focus:ring-slate-200",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
  dark:
    "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
};

const SIZES = {
  xs: "px-2.5 py-1 text-xs rounded-lg gap-1",
  sm: "px-3.5 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
  xl: "px-8 py-4 text-lg rounded-2xl gap-2.5",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  icon,
  iconRight,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${fullWidth ? "w-full" : ""}
        inline-flex items-center justify-center font-medium
        transition-all duration-200 ease-out
        active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        select-none outline-none
        ${className}
      `}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}

      {children && (
        <span className={loading ? "opacity-70" : ""}>{children}</span>
      )}

      {iconRight && !loading && (
        <span className="shrink-0">{iconRight}</span>
      )}
    </button>
  );
};

export default Button;
