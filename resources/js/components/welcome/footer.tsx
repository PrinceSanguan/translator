const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Simple divider */}
                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    {/* Logo */}
                    <div className="mb-2">
                        <h3 className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">CacaoTalk</h3>
                    </div>

                    {/* Simplified tagline */}
                    <p className="text-sm text-slate-400">Breaking language barriers with AI translation</p>

                    {/* Copyright with credit */}
                    <div className="mt-4 text-xs text-slate-500">
                        <p>© 2025 CacaoTalk. All rights reserved.</p>
                        <p className="mt-1">
                            Created by{' '}
                            <a
                                href="https://psanguan.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 transition-colors hover:text-cyan-300"
                            >
                                StudentWebSolutions
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
