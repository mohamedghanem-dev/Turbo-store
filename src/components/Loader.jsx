const Loader = ({ size = "md", fullPage = false }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  const spinner = (
    <div className={`${sizes[size]} border-brand-200 border-t-brand-600 rounded-full animate-spin`} />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500 animate-pulse-soft">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
};

export default Loader;
