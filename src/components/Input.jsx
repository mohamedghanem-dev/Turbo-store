const Input = ({
  label,
  placeholder = "",
  type = "text",
  error = "",
  value,
  onChange,
  name,
  disabled = false,
  className = "",
  hint = "",
  prefix,
  suffix,
  required = false,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500 text-xs">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
            {prefix}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full h-10 sm:h-11
            ${prefix ? "pl-9" : "pl-3.5"}
            ${suffix ? "pr-9" : "pr-3.5"}
            text-sm
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            border rounded-xl
            outline-none
            transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900" : ""}
            ${
              error
                ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/40"
                : "border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900/40"
            }
          `}
        />

        {suffix && (
          <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
            {suffix}
          </div>
        )}
      </div>

      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
