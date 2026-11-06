import { SearchX, WifiOff, RotateCcw } from 'lucide-react';

export function EmptyState({ onReset }) {
    return (
        <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <SearchX className="h-8 w-8" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 font-['Fraunces',serif] text-2xl font-semibold text-slate-900">
                No countries found
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Nothing matches your search and region. Check the spelling
                or clear your filters to see every country.
            </p>
            {onReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}

export function ErrorState({ onRetry }) {
    return (
        <div className="flex flex-col items-center rounded-3xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <WifiOff className="h-8 w-8" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 font-['Fraunces',serif] text-2xl font-semibold text-slate-900">
                Couldn't load countries
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                The country data didn't load. Check your internet
                connection and try again.
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
                <RotateCcw className="h-4 w-4" />
                Try again
            </button>
        </div>
    );
}