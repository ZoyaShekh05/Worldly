import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryCard from '../component/CountryCard';
import Navbar from '../component/Navbar';
import Hero from '../component/Hero';
import Footer from '../component/Footer';
import { CountrySkeletonGrid } from '../component/CountrySkeleton.jsx';
import { EmptyState, ErrorState } from '../component/StatusMessages';
import { Search, ChevronDown, X } from 'lucide-react';

const PAGE_SIZE = 8;

function Home() {

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);


    // Saari countries ek baar fetch hongi, Load More sirf slice badhayega
    async function getCountry() {
        try {
            setError(false);
            setLoading(true);

            const { data } = await axios.get('https://countries.dev/countries?limit=250');
            setCountries(data);

        } catch (error) {
            console.log("API Error:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCountry();
    }, []);

    // search ya region badle to wapas pehle 8 se shuru
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [search, region]);


    const filteredCountries = countries.filter((country) => {

        const matchesSearch = country.name
            ? country.name.toLowerCase()
                .includes(search.toLowerCase()) : false;

        const matchesRegion =
            region === 'All' || country.region === region;

        return matchesSearch && matchesRegion;
    });

    const visibleCountries = filteredCountries.slice(0, visibleCount);

    function resetFilters() {
        setSearch('');
        setRegion('All');
    }

    return (

        <div className="min-h-screen overflow-x-clip bg-[#F7F8FC] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 antialiased">

            <Navbar />

            <Hero />


            <main id="countries" className="mx-auto w-full max-w-7xl scroll-mt-20 px-5 pb-20 pt-6 sm:px-8">


                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="font-['Fraunces',serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            All countries
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Search by name or narrow the list by region.
                        </p>
                    </div>

                    {!loading && !error && (
                        <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                            {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
                        </span>
                    )}
                </div>


                <div className="mb-10 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgba(30,58,138,0.06)] md:flex-row">

                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search for a country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-transparent bg-slate-50 py-4 pl-12 pr-12 text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:bg-slate-100/70 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="relative md:w-60">
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            aria-label="Filter by region"
                            className="w-full cursor-pointer appearance-none rounded-xl border border-transparent bg-slate-50 py-4 pl-5 pr-12 text-base font-medium text-slate-800 transition-all duration-200 hover:bg-slate-100/70 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                        >
                            <option value="All">All Regions</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    </div>

                </div>


                {loading ? (

                    <CountrySkeletonGrid />

                ) : error ? (

                    <ErrorState onRetry={getCountry} />

                ) : filteredCountries.length > 0 ? (

                    <>
                        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {visibleCountries.map((country) => (

                                <CountryCard
                                    key={country.alpha3Code}
                                    country={country}
                                />

                            ))}

                        </div>

                        {visibleCount < filteredCountries.length && (
                            <div className="mt-10 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                                    className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>

                ) : (

                    <EmptyState onReset={resetFilters} />

                )}

            </main>

            <Footer />

        </div>

    );

}

export default Home;