import { Star, StarHalf } from "lucide-react";

interface Props {
    rating?: number;
    count?: number;
    className?: string;
}

export default function ReviewStars({ rating = 4.9, count = 12450, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => {
                const isFull = i < Math.floor(rating);
                const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5;
                
                if (isFull) {
                    return <Star key={i} size={16} fill="currentColor" strokeWidth={0} />;
                } else if (isHalf) {
                    return <StarHalf key={i} size={16} fill="currentColor" strokeWidth={0} />;
                } else {
                    return <Star key={i} size={16} className="text-slate-300 dark:text-slate-600" strokeWidth={2} />;
                }
            })}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">{rating}</span>
            <span>({new Intl.NumberFormat('pt-BR').format(count)} avaliações)</span>
        </div>
    </div>
  );
}
