import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">

                <div className="max-w-sm">
                    <Link to="/" className="inline-flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#1e3a8a,#2563eb)] text-white">
                            <Globe className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <span className="font-['Fraunces',serif] text-xl font-semibold tracking-tight text-slate-900">
                            Worldly
                        </span>
                    </Link>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Search any country and see its capital, population,
                        languages, currencies and neighbours in one place.
                    </p>
                </div>

                <p className="text-sm text-slate-400">
                    © {new Date().getFullYear()} Worldly. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;