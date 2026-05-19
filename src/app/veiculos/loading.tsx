import { Skeleton } from "@/components/ui/skeleton";

export default function VeiculosLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Skeleton - Matches PageHeader */}
        <div className="relative w-full h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4">
            <Skeleton className="h-4 w-32 bg-slate-200/60 dark:bg-slate-800/60" />
            <Skeleton className="h-10 md:h-14 w-3/4 max-w-2xl bg-slate-300/60 dark:bg-slate-700/60 rounded-xl" />
            <Skeleton className="h-4 md:h-6 w-1/2 max-w-xl bg-slate-200/60 dark:bg-slate-800/60 mt-2" />
          </div>
        </div>

        {/* Content Skeleton - Sleek Single Column for Vehicles/FIPE */}
        <div className="space-y-6">
          {/* Main Card Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <Skeleton className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800" />
            
            {/* Spec Grid / Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/50" />
              ))}
            </div>
          </div>

          {/* Secondary SEO Box Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <Skeleton className="h-6 w-1/4 bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-slate-50 dark:bg-slate-800" />
              <Skeleton className="h-4 w-5/6 bg-slate-50 dark:bg-slate-800" />
              <Skeleton className="h-4 w-4/6 bg-slate-50 dark:bg-slate-800" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
