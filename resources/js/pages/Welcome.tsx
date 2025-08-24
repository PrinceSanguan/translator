import ChatDemo from '@/components/welcome/chat-demo';
import Footer from '@/components/welcome/footer';
import Navbar from '@/components/welcome/navbar';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Check, Globe, MessageSquare, Users, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Main Welcome component
export default function Welcome() {
    // Modal state for registration
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    // Refs for GSAP animations
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroImageRef = useRef(null);
    const featuresRef = useRef(null);
    const modalRef = useRef(null);
    const benefitsRef = useRef(null);

    // Listen for custom events from ChatDemo
    useEffect(() => {
        // Original event handler
        const handleShowRegistration = () => {
            setShowRegistrationModal(true);
        };

        // New event handler for translation errors
        const handleTranslationError = () => {
            setShowRegistrationModal(true);
        };

        // Add event listeners
        window.addEventListener('showRegistration', handleShowRegistration);
        window.addEventListener('translationError', handleTranslationError);

        return () => {
            // Clean up event listeners
            window.removeEventListener('showRegistration', handleShowRegistration);
            window.removeEventListener('translationError', handleTranslationError);
        };
    }, []);

    // Initialize GSAP animations on component mount
    useEffect(() => {
        // Hero animations
        if (heroRef.current) {
            // Only animate on desktop
            if (window.innerWidth > 768) {
                gsap.from(heroContentRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power3.out',
                });

                gsap.from(heroImageRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.6,
                    ease: 'power3.out',
                });
            } else {
                // Simpler animation for mobile
                gsap.from(heroImageRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            }
        }

        // Features animation
        if (featuresRef.current) {
            const cards = (featuresRef.current as HTMLElement).querySelectorAll('.feature-card');
            gsap.from(cards, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: 'top 80%',
                },
            });
        }

        // Benefits animation
        if (benefitsRef.current) {
            const items = (benefitsRef.current as HTMLElement).querySelectorAll('.benefit-item');
            gsap.from(items, {
                x: -30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: benefitsRef.current,
                    start: 'top 85%',
                },
            });
        }
    }, []);

    // Modal animation
    useEffect(() => {
        if (showRegistrationModal && modalRef.current) {
            gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    }, [showRegistrationModal]);

    // Handle Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            // In a real implementation, you would redirect to your OAuth route
            window.location.href = '/auth/google';
        } catch (error) {
            console.error('Google sign in error:', error);
        }
    };

    return (
        <>
            <Head title="CacaoTalk - Filipino to English Translator" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section - Futuristic AI Design */}
            <div
                ref={heroRef}
                className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pt-16 pb-16"
            >
                {/* Background elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500 opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
                    <div className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-violet-500 opacity-5 blur-3xl"></div>

                    {/* Floating AI particles */}
                    <div className="absolute top-1/4 right-1/4 h-2 w-2 animate-pulse rounded-full bg-cyan-400 opacity-70 shadow-lg shadow-cyan-500/50"></div>
                    <div
                        className="absolute top-1/3 right-1/3 h-3 w-3 animate-pulse rounded-full bg-blue-400 opacity-70 shadow-lg shadow-blue-500/50"
                        style={{ animationDelay: '1.5s' }}
                    ></div>
                    <div
                        className="absolute right-1/2 bottom-1/4 h-2 w-2 animate-pulse rounded-full bg-purple-400 opacity-70 shadow-lg shadow-purple-500/50"
                        style={{ animationDelay: '0.7s' }}
                    ></div>
                    <div
                        className="absolute bottom-1/3 left-1/4 h-2 w-2 animate-pulse rounded-full bg-indigo-400 opacity-70 shadow-lg shadow-indigo-500/50"
                        style={{ animationDelay: '2s' }}
                    ></div>

                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
                </div>

                <div className="relative container mx-auto px-4 py-8 md:py-20">
                    {/* Reordered flex container - mobile shows chat first, desktop shows content first */}
                    <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-16">
                        {/* DESKTOP CONTENT - Hidden on mobile */}
                        <div ref={heroContentRef} className="hidden md:block md:w-1/2 md:text-left">
                            {/* Floating badge */}
                            <div className="mb-6 inline-block origin-left animate-pulse rounded-full border border-cyan-500/20 bg-indigo-500/10 px-4 py-1 text-sm font-medium text-cyan-400 backdrop-blur-sm">
                                Pinakabagong AI Translation Technologysddasd 🇵🇭
                            </div>

                            <h1 className="mb-6 bg-gradient-to-r from-white via-cyan-300 to-violet-300 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-5xl lg:text-6xl">
                                Tagalog-English Translator, <span className="text-cyan-400">Mabilis at Tama!</span>
                            </h1>

                            <div className="mb-8 max-w-xl">
                                <p className="text-xl text-slate-300 md:text-2xl">
                                    Hindi na mahirap ang pagsasalin ng Tagalog sa English!! Try our advanced AI translator and break the language
                                    barrier instantly.
                                </p>

                                {/* Animated typing effect text */}
                                <div className="mt-4 h-8 overflow-hidden text-cyan-300">
                                    <div className="animate-slide">
                                        <p className="h-8">"Kumusta ka?" → "How are you?"</p>
                                        <p className="h-8">"Salamat po!" → "Thank you!"</p>
                                        <p className="h-8">"Mahal kita" → "I love you"</p>
                                        <p className="h-8">"Mag-ingat ka" → "Take care"</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature highlights */}
                            <div className="mb-8 grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-cyan-400" />
                                    <span className="text-white">Real-time translation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-cyan-400" />
                                    <span className="text-white">100% accurate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-cyan-400" />
                                    <span className="text-white">Slang support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-cyan-400" />
                                    <span className="text-white">Contextual meaning</span>
                                </div>
                            </div>

                            {/* Simple call to action - just try it */}
                            <div className="mt-6 text-lg text-white">
                                <span className="animate-pulse font-bold text-cyan-300">→</span> Try typing Tagalog in the translator!
                            </div>
                        </div>

                        {/* CHAT COMPONENT - Appears first on mobile */}
                        <div ref={heroImageRef} className="relative z-20 mx-auto w-full max-w-lg md:mx-0 md:w-1/2">
                            {/* Mobile-only header */}
                            <div className="mb-6 text-center md:hidden">
                                <h1 className="bg-gradient-to-r from-white via-cyan-300 to-violet-300 bg-clip-text text-3xl font-bold text-transparent">
                                    CacaoTalk
                                </h1>
                                <p className="mt-2 text-cyan-400">Tagalog-English Translation</p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-slate-900/50 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
                                {/* Edge glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/30 via-transparent to-purple-500/30 opacity-50 blur-md"></div>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5"></div>
                                <div className="relative z-10">
                                    <ChatDemo />
                                </div>
                            </div>

                            {/* Trust indicators below chat */}
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
                                <div>
                                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50">
                                        <Users className="h-4 w-4 text-cyan-400" />
                                    </div>
                                    <p className="mt-1">10K+ Active Users</p>
                                </div>
                                <div>
                                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50">
                                        <Zap className="h-4 w-4 text-cyan-400" />
                                    </div>
                                    <p className="mt-1">Instant Translation</p>
                                </div>
                                <div>
                                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50">
                                        <Globe className="h-4 w-4 text-cyan-400" />
                                    </div>
                                    <p className="mt-1">Filipino Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits section */}
                <div className="relative container mx-auto mt-16 px-4">
                    <div ref={benefitsRef} className="mb-16 rounded-xl bg-gradient-to-r from-slate-800/50 to-indigo-900/50 p-8 backdrop-blur-sm">
                        <h2 className="mb-6 text-center text-2xl font-bold text-white">How CacaoTalk Makes Life Easier</h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="benefit-item rounded-lg bg-indigo-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                                        <MessageSquare className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For OFWs and Immigrants</h3>
                                </div>
                                <p className="text-slate-300">
                                    Communicate confidently with employers and friends abroad. Never struggle with language barriers again.
                                </p>
                            </div>

                            <div className="benefit-item rounded-lg bg-indigo-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                                        <Globe className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For Students</h3>
                                </div>
                                <p className="text-slate-300">
                                    Perfect your English essays and homework. Learn proper English translations for academic success.
                                </p>
                            </div>

                            <div className="benefit-item rounded-lg bg-indigo-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                                        <Users className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For Businesses</h3>
                                </div>
                                <p className="text-slate-300">
                                    Create professional emails and documents make it fix. Improve communication with international clients and
                                    partners.
                                </p>
                            </div>

                            <div className="benefit-item rounded-lg bg-indigo-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                                        <Zap className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For Everyone</h3>
                                </div>
                                <p className="text-slate-300">
                                    Simple, fast translations for everyday needs. Understand content across languages without effort.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Authentication Modal */}
            {showRegistrationModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div ref={modalRef} className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Continue with Google</h3>
                            <button onClick={() => setShowRegistrationModal(false)} className="rounded-full p-1 hover:bg-gray-200" aria-label="Close">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-6 text-center">
                            <p className="mb-4 text-gray-600">
                                You've reached the limit of free translations. Sign in with Google to continue using our premium service.
                            </p>

                            <div className="mx-auto mb-4 h-16 w-16 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-full w-full">
                                    <path
                                        fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                </svg>
                            </div>

                            <p className="mb-6 text-sm text-gray-500">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 transition hover:bg-gray-50"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
