import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Countries', href: '/#countries' },
];

const linkClass =
    'rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#F7F8FC]/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">

               
                <Link
                    to="/"
                    className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => setOpen(false)}
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1e3a8a,#2563eb)] text-white shadow-md shadow-blue-900/20">
                        <Globe className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-['Fraunces',serif] text-2xl font-semibold tracking-tight text-slate-900">
                        Worldly
                    </span>
                </Link>

               
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((item) =>
                        item.to ? (
                            <Link key={item.label} to={item.to} className={linkClass}>
                                {item.label}
                            </Link>
                        ) : (
                            <a key={item.label} href={item.href} className={linkClass}>
                                {item.label}
                            </a>
                        )
                    )}
                </div>

                
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

           
            <div
                className={`grid overflow-hidden border-slate-200/70 transition-all duration-300 md:hidden ${
                    open ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="flex flex-col gap-1 bg-white px-5 py-3">
                        {navLinks.map((item) =>
                            item.to ? (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={linkClass}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={linkClass}
                                >
                                    {item.label}
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;