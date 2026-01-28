import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Skeleton - Imita o PageHeader */}
        <div className="relative w-full h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4">
            <Skeleton className="h-4 w-32 bg-slate-200/60 dark:bg-slate-800/60" />
            <Skeleton className="h-10 md:h-14 w-3/4 max-w-2xl bg-slate-300/60 dark:bg-slate-700/60 rounded-xl" />
            <Skeleton className="h-4 md:h-6 w-1/2 max-w-xl bg-slate-200/60 dark:bg-slate-800/60 mt-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Content Skeleton */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <Skeleton className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 mb-6" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-4 w-4/6 bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                 <Skeleton className="h-32 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
                 <Skeleton className="h-32 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
            
            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                   <Skeleton className="h-10 w-10 rounded-lg mb-4 bg-slate-200 dark:bg-slate-800" />
                   <Skeleton className="h-5 w-3/4 mb-2 bg-slate-200 dark:bg-slate-800" />
                   <Skeleton className="h-3 w-full bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="hidden lg:block space-y-6">
             <Skeleton className="h-[400px] w-full rounded-3xl bg-slate-200 dark:bg-slate-800" />
             <Skeleton className="h-[200px] w-full rounded-3xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
