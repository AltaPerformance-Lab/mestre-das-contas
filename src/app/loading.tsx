import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-5 space-y-6">
             <Skeleton className="h-[500px] w-full rounded-2xl" />
        </div>
      </div>

    </div>
  );
}
