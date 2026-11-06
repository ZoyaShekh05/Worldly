import { ArrowRight, Search, Filter, Info } from 'lucide-react';

const highlights = [
    { icon: Search, label: 'Search by name' },
    { icon: Filter, label: 'Filter by region' },
    { icon: Info, label: 'Full country details' },
];

function GlobeIllustration() {
    return (
        <svg
            viewBox="0 0 400 400"
            className="h-full w-full"
            fill="none"
            aria-hidden="true"
        >
            <defs>
                <radialGradient id="globeFill" cx="35%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dbe7fb" />
                </radialGradient>
                <clipPath id="globeClip">
                    <circle cx="200" cy="200" r="180" />
                </clipPath>
            </defs>

            <circle cx="200" cy="200" r="180" fill="url(#globeFill)" />

            <g clipPath="url(#globeClip)" stroke="#2563eb" strokeOpacity="0.25" strokeWidth="1.2">
                
                {[70, 130, 200, 270, 330].map((y) => (
                    <line key={y} x1="0" x2="400" y1={y} y2={y} />
                ))}
               
                <ellipse cx="200" cy="200" rx="50" ry="180" />
                <ellipse cx="200" cy="200" rx="105" ry="180" />
                <ellipse cx="200" cy="200" rx="155" ry="180" />
                <line x1="200" x2="200" y1="20" y2="380" />
            </g>

            <circle cx="200" cy="200" r="180" stroke="#1e3a8a" strokeOpacity="0.35" strokeWidth="1.5" />

           
            {[
                [150, 130],
                [245, 165],
                [285, 235],
                [175, 270],
                [120, 215],
            ].map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                    <circle cx={cx} cy={cy} r="9" fill="#2563eb" fillOpacity="0.15" />
                    <circle cx={cx} cy={cy} r="3.5" fill="#1e3a8a" />
                </g>
            ))}
        </svg>
    );
}

function Hero() {
    return (
        <section className="relative">
           
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#c3d3f2_1px,transparent_1px)] bg-size-[24px_24px] opacity-60 mask-[linear-gradient(to_bottom,black_40%,transparent)]" />
            <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:py-20 lg:py-24">

                <div>
                    <h1 className="font-['Fraunces',serif] text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Discover the World,{' '}
                        <span className="bg-[linear-gradient(90deg,#1d4ed8,#0ea5e9)] bg-clip-text text-transparent">
                            One Country at a Time.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                        Look up any country and see its capital, population,
                        region, languages and currencies, then follow its
                        borders to the countries next door.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <a
                            href="#countries"
                            className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-700/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                        >
                            Start exploring
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>

                        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                            {highlights.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-1.5">
                                    <Icon className="h-4 w-4 text-blue-600" />
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                
                <div className="mx-auto hidden aspect-square w-full max-w-md drop-shadow-[0_30px_50px_rgba(30,58,138,0.18)] md:block">
                    <GlobeIllustration />
                </div>
            </div>
        </section>
    );
}

export default Hero;