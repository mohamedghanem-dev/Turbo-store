const SkeletonCard = () => (
  <div className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/60 shadow-card">
    <div className="aspect-square shimmer" />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-4 shimmer rounded-full w-16" />
      <div className="space-y-2">
        <div className="h-4 shimmer rounded-full w-full" />
        <div className="h-4 shimmer rounded-full w-3/4" />
      </div>
      <div className="h-3 shimmer rounded-full w-20" />
      <div className="flex items-center justify-between pt-1">
        <div className="h-5 shimmer rounded-full w-16" />
        <div className="h-8 shimmer rounded-xl w-16" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
