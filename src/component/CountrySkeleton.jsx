
function CountrySkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white" aria-hidden="true">
            <div className="aspect-16/10 animate-pulse bg-slate-200/70" />
            <div className="space-y-4 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded-md bg-slate-200/70" />
                <div className="space-y-2.5">
                    <div className="h-3.5 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="h-3.5 w-2/5 animate-pulse rounded bg-slate-100" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
            </div>
        </div>
    );
}

export function CountrySkeletonGrid({ count = 8 }) {
    return (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="status" aria-label="Loading countries">
            {Array.from({ length: count }).map((_, i) => (
                <CountrySkeleton key={i} />
            ))}
        </div>
    );
}

export default CountrySkeleton;