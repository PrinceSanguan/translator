import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (navbarRef.current) {
            gsap.from(navbarRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }
    }, []);

    return (
        <nav
            ref={navbarRef}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-slate-900/80 py-3 shadow-lg shadow-cyan-500/10 backdrop-blur-md' : 'bg-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                                <path d="M20.25 3.75V5.25H18.75V3.75H20.25Z" fill="white" />
                                <path d="M20.25 8.25V9.75H18.75V8.25H20.25Z" fill="white" />
                                <path d="M20.25 12.75V14.25H18.75V12.75H20.25Z" fill="white" />
                                <path d="M20.25 17.25V18.75H18.75V17.25H20.25Z" fill="white" />
                                <path d="M5.25 3.75V5.25H3.75V3.75H5.25Z" fill="white" />
                                <path d="M5.25 8.25V9.75H3.75V8.25H5.25Z" fill="white" />
                                <path d="M5.25 12.75V14.25H3.75V12.75H5.25Z" fill="white" />
                                <path d="M5.25 17.25V18.75H3.75V17.25H5.25Z" fill="white" />
                                <path d="M12.75 3.75V5.25H11.25V3.75H12.75Z" fill="white" />
                                <path d="M12.75 18.75V20.25H11.25V18.75H12.75Z" fill="white" />
                                <path d="M3.75 11.25V12.75H2.25V11.25H3.75Z" fill="white" />
                                <path d="M21.75 11.25V12.75H20.25V11.25H21.75Z" fill="white" />
                                <path
                                    d="M16.5 12C16.5 14.485 14.485 16.5 12 16.5C9.515 16.5 7.5 14.485 7.5 12C7.5 9.515 9.515 7.5 12 7.5C14.485 7.5 16.5 9.515 16.5 12Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <div>
                            <span className="bg-gradient-to-r from-white via-cyan-300 to-violet-300 bg-clip-text text-xl font-bold text-transparent">
                                CacaoTalk
                            </span>
                            <span className="ml-1 hidden text-xs text-cyan-400 sm:inline-block">AI Translator</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center md:flex">
                        <Link href="/login" className="group relative overflow-hidden rounded-lg px-5 py-2.5 transition-all duration-300 ease-out">
                            <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-70 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"></span>
                            <span className="relative flex items-center justify-center text-sm font-medium text-white">
                                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                        fill="currentColor"
                                        fillOpacity="0.25"
                                    />
                                    <path
                                        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
                                        fill="currentColor"
                                        fillOpacity="0.25"
                                    />
                                </svg>
                                Sign In with Google
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none md:hidden" aria-label="Toggle menu">
                        {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="mt-4 rounded-lg bg-slate-800/90 pb-4 shadow-lg backdrop-blur-sm md:hidden">
                        <div className="flex flex-col space-y-3 p-4">
                            <Link
                                href="/login"
                                className="flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20"
                                onClick={() => setIsOpen(false)}
                            >
                                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                        fill="currentColor"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
                                        fill="currentColor"
                                        fillOpacity="0.8"
                                    />
                                </svg>
                                Sign In with Google
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
