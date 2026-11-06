import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Maximize2, ArrowRight } from 'lucide-react';

function CountryCard({ country }) {

    const {
        name,
        capital,
        region,
        population,
        area,
        alpha3Code
    } = country;

    const stats = [
        {
            icon: MapPin,
            label: 'Capital',
            value: capital || 'N/A',
        },
        {
            icon: Users,
            label: 'Population',
            value: population != null ? Number(population).toLocaleString() : 'N/A',
        },
        {
            icon: Maximize2,
            label: 'Area',
            value: area != null ? `${Number(area).toLocaleString()} km²` : 'N/A',
        },
    ];

    return (
        <Link
            to={`/country/${alpha3Code}`}
            className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(30,58,138,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_40px_rgba(30,58,138,0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >

           
            <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">

                <img
                    src={country.flags?.svg || country.flags?.png}
                    alt={`${name} flag`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/5" />

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-800 shadow-sm backdrop-blur">
                    {region || 'N/A'}
                </span>

            </div>

            
            <div className="flex flex-1 flex-col p-5">

                <div className="flex items-start justify-between gap-3">

                    <h2
                        title={name}
                        className="line-clamp-1 font-['Fraunces',serif] text-xl font-semibold tracking-tight text-slate-900"
                    >
                        {name}
                    </h2>

                    <span
                        title="Country code"
                        className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold tracking-wide text-slate-500"
                    >
                        {alpha3Code}
                    </span>

                </div>

                
                <dl className="mb-5 mt-4 space-y-2.5">
                    {stats.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 text-sm">
                            <Icon className="h-4 w-4 shrink-0 text-blue-600" strokeWidth={1.75} />
                            <dt className="sr-only">{label}</dt>
                            <dd className="min-w-0 truncate text-slate-600" title={String(value)}>
                                <span className="text-slate-400">{label}:</span>{' '}
                                <span className="font-medium text-slate-800">{value}</span>
                            </dd>
                        </div>
                    ))}
                </dl>

                
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">

                    <span className="text-sm font-semibold text-blue-700 transition-colors group-hover:text-blue-900">
                        View details
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>

                </div>

            </div>

        </Link>
    );
}

export default CountryCard;