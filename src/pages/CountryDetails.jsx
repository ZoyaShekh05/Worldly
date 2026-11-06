
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import {
    ArrowLeft,
    MapPin,
    Users,
    Maximize2,
    Layers,
    Languages,
    Coins,
    Compass,
    Info,
    ExternalLink,
    SearchX,
    RotateCcw,
} from 'lucide-react';

const ring =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const pageClass =
    "min-h-screen overflow-x-clip bg-[#F7F8FC] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 antialiased";

const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

function BackButton() {
    return (
        <Link
            to="/"
            className={"group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-200 hover:text-blue-700 hover:shadow-md active:scale-[0.98] " + ring}
        >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all countries
        </Link>
    );
}

function Tile({ icon: Icon, label, value }) {
    return (
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(30,58,138,0.04)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(30,58,138,0.09)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <p className="mt-1 wrap-break-word text-xl font-semibold text-slate-900">{value}</p>
        </div>
    );
}

function Panel({ icon: Icon, title, children }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(30,58,138,0.04)]">
            <h2 className="flex items-center gap-2.5 font-['Fraunces',serif] text-xl font-semibold tracking-tight text-slate-900">
                <Icon className="h-5 w-5 text-blue-600" strokeWidth={1.75} />
                {title}
            </h2>
            <div className="mt-4 text-slate-700">{children}</div>
        </section>
    );
}

function Fact({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3.5 last:border-0">
            <dt className="shrink-0 text-sm text-slate-500">{label}</dt>
            <dd className="min-w-0 wrap-break-word text-right text-sm font-medium text-slate-900">{value}</dd>
        </div>
    );
}

function CountryDetails() {
    const { code } = useParams();

    const [country, setCountry] = useState(null);
    const [allCountries, setAllCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCountryDetails() {
            setLoading(true);
            try {
                const { data } = await axios.get('https://countries.dev/countries');

                const found = data.find(
                    (c) => c.alpha3Code.toLowerCase() === code.toLowerCase()
                );
                setAllCountries(data);
                setCountry(found || null);
            } catch (error) {
                console.log("Details error:", error);
                setCountry(null);
            } finally {
                setLoading(false);
            }
        }

        getCountryDetails();
    }, [code]);

    if (loading) {
        return (
            <div className={pageClass}>
                <Navbar />
                <div className={container + " py-8"} role="status" aria-label="Loading country">
                    <div className="h-11 w-56 animate-pulse rounded-xl bg-slate-200/70" />

                    <div className="mt-8 grid animate-pulse gap-8 lg:grid-cols-2">
                        <div className="aspect-3/2 rounded-3xl bg-slate-200/70" />
                        <div className="space-y-5">
                            <div className="h-6 w-32 rounded-full bg-slate-200/70" />
                            <div className="h-12 w-3/4 rounded-xl bg-slate-200/70" />
                            <div className="h-5 w-1/2 rounded bg-slate-100" />
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="h-32 rounded-2xl bg-slate-200/70" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid animate-pulse gap-6 lg:grid-cols-3">
                        <div className="h-48 rounded-2xl bg-slate-200/70 lg:col-span-2" />
                        <div className="h-48 rounded-2xl bg-slate-200/70" />
                    </div>
                </div>
            </div>
        );
    }

    if (!country) {
        return (
            <div className={pageClass}>
                <Navbar />
                <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <SearchX className="h-8 w-8" strokeWidth={1.5} />
                    </span>
                    <h1 className="mt-6 font-['Fraunces',serif] text-3xl font-semibold tracking-tight">
                        Country not found
                    </h1>
                    <p className="mt-2 text-slate-500">
                        No country matches the code "{code}", or the data didn't
                        load. Go back to the list, or try again.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            to="/"
                            className={"inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-[0.98] " + ring}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to all countries
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className={"inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-300 hover:text-blue-700 active:scale-[0.98] " + ring}
                        >
                            <RotateCcw className="h-4 w-4" />
                            Try again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const neighbours = (country.borders || []).map((b) => ({
        code: b,
        data: allCountries.find((c) => c.alpha3Code === b),
    }));

    return (
        <div className={pageClass}>
            <Navbar />

            
            <section className="relative">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-112 bg-[linear-gradient(to_bottom,#e6eefc,transparent)]" />

                <div className={container + " relative pb-6 pt-8"}>
                    <BackButton />

                    <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">

                       
                        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(30,58,138,0.14)]">
                            <img
                                src={country.flags?.svg || country.flags?.png}
                                alt={`${country.name} flag`}
                                className="w-full rounded-2xl border border-slate-100"
                            />
                        </div>

                       
                        <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                                {country.region && (
                                    <span className="rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold text-white">
                                        {country.region}
                                    </span>
                                )}
                                {country.subregion && (
                                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
                                        {country.subregion}
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-4 wrap-break-word font-['Fraunces',serif] text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                {country.name}
                            </h1>
                            <p className="mt-2 wrap-break-word text-lg text-slate-500">
                                {country.nativeName || country.name}
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <Tile icon={MapPin} label="Capital" value={country.capital || "N/A"} />
                                <Tile
                                    icon={Users}
                                    label="Population"
                                    value={
                                        country.population != null
                                            ? Number(country.population).toLocaleString()
                                            : "N/A"
                                    }
                                />
                                <Tile
                                    icon={Maximize2}
                                    label="Area"
                                    value={
                                        country.area != null
                                            ? `${Number(country.area).toLocaleString()} km²`
                                            : "N/A"
                                    }
                                />
                                <Tile
                                    icon={Layers}
                                    label="Density"
                                    value={
                                        country.populationDensity != null
                                            ? `${Number(country.populationDensity).toLocaleString()} /km²`
                                            : "N/A"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <main className={container + " grid gap-8 pb-20 pt-8 lg:grid-cols-3"}>
                <div className="space-y-6 lg:col-span-2">

                    <div className="grid gap-6 md:grid-cols-2">
                        <Panel icon={Languages} title="Languages">
                            {country.languages?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {country.languages.map((lang) => (
                                        <span key={lang.name} className="rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-800">
                                            {lang.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                "N/A"
                            )}
                        </Panel>

                        <Panel icon={Coins} title="Currencies">
                            {country.currencies?.length ? (
                                <ul className="space-y-2.5">
                                    {country.currencies.map((c) => (
                                        <li key={c.code || c.name} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-2.5 text-sm">
                                            <span className="font-medium text-slate-800">{c.name}</span>
                                            <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                                                {c.symbol || c.code}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                "N/A"
                            )}
                        </Panel>
                    </div>

                    <Panel icon={Compass} title="Bordering countries">
                        {neighbours.length ? (
                            <div className="flex flex-wrap gap-2.5">
                                {neighbours.map(({ code: b, data }) =>
                                    data ? (
                                        <Link
                                            key={b}
                                            to={`/country/${b}`}
                                            className={"flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md " + ring}
                                        >
                                            <img
                                                src={data.flags?.svg}
                                                alt=""
                                                className="h-7 w-7 rounded-full border border-slate-100 object-cover"
                                            />
                                            {data.name}
                                        </Link>
                                    ) : (
                                        <span key={b} className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-500">
                                            {b}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            "No land borders"
                        )}
                    </Panel>
                </div>

                <aside className="lg:col-span-1">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(30,58,138,0.04)] lg:sticky lg:top-24">
                        <h2 className="flex items-center gap-2.5 font-['Fraunces',serif] text-xl font-semibold tracking-tight">
                            <Info className="h-5 w-5 text-blue-600" strokeWidth={1.75} />
                            Quick facts
                        </h2>
                        <dl className="mt-3">
                            <Fact label="Region" value={country.region || "N/A"} />
                            <Fact label="Subregion" value={country.subregion || "N/A"} />
                            <Fact label="Native name" value={country.nativeName || country.name} />
                            <Fact
                                label="Calling code"
                                value={
                                    country.callingCodes?.length
                                        ? `+${country.callingCodes.join(", +")}`
                                        : "N/A"
                                }
                            />
                            <Fact
                                label="Internet domain"
                                value={country.topLevelDomain?.join(", ") || "N/A"}
                            />
                            <Fact
                                label="Independent"
                                value={
                                    typeof country.independent === "boolean"
                                        ? country.independent ? "Yes" : "No"
                                        : "N/A"
                                }
                            />
                        </dl>

                        {country.maps?.openStreetMaps && (
                            <a
                                href={country.maps.openStreetMaps}
                                target="_blank"
                                rel="noreferrer"
                                className={"mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-[0.98] " + ring}
                            >
                                View on OpenStreetMap
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                        <Link
                            to="/"
                            className={"mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-300 hover:text-blue-700 active:scale-[0.98] " + ring}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to all countries
                        </Link>
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
}

export default CountryDetails;