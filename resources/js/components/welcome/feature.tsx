import { Card, CardContent } from '@/components/ui/card';
import { Database, Globe, MessageSquare, Mic, Shield, Zap } from 'lucide-react';
import { useRef } from 'react';

const Feature = () => {
    const featuresRef = useRef<HTMLDivElement>(null);

    return (
        <div id="features" ref={featuresRef} className="bg-slate-100 py-24 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-indigo-400 dark:to-cyan-400">
                        Advanced Features
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Powered by neural networks and machine learning algorithms to deliver unparalleled translation quality.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="feature-card border border-indigo-100 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-900 dark:bg-slate-900/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 rounded-full border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-4">
                                    <MessageSquare className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">Neural Chat Translation</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Contextual understanding that captures nuances and cultural references for natural-sounding translations.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="feature-card border border-indigo-100 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-900 dark:bg-slate-900/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 rounded-full border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
                                    <Mic className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">Real-time Voice Processing</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Speak naturally in Filipino and hear instant, accurate English translations with native-like pronunciation.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="feature-card border border-indigo-100 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-900 dark:bg-slate-900/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 rounded-full border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-4">
                                    <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">Adaptive Learning</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Our AI continuously improves from user interactions, adapting to your specific vocabulary and expressions.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional features row */}
                <div className="mt-8 grid gap-8 md:grid-cols-3">
                    <Card className="feature-card border border-indigo-100 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-900 dark:bg-slate-900/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 rounded-full border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-4">
                                    <Globe className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">Cultural Intelligence</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Translations that respect Filipino cultural context and idiomatic expressions for more meaningful communication.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="feature-card border border-indigo-100 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-900 dark:bg-slate-900/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 rounded-full border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
                                    <Database className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">Offline Capability</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Access essential translation features even without an internet connection, perfect for travel and remote areas.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="feature-card border border-indigo-100 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-900 dark:bg-slate-900/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 rounded-full border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-4">
                                    <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">Privacy-Focused</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    End-to-end encryption ensures your conversations and translations remain private and secure.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Feature;
