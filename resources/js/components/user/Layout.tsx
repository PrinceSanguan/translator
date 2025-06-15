import Sidebar from '@/components/user/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface UserData {
    name: string;
    email: string;
    avatar: string | null;
}

interface LayoutProps {
    user: UserData;
    children: ReactNode;
}

const Layout = ({ user, children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Sidebar user={user} />

            {/* Main content area with proper padding for mobile menu button */}
            <div className="flex min-h-screen flex-col transition-all duration-300 md:ml-64">
                {/* Extra padding on mobile to account for hamburger menu */}
                <div className="flex-grow pt-16 md:pt-0">
                    <main className="w-full">{children}</main>
                </div>

                {/* Footer */}
                <footer className="mt-auto bg-slate-800 px-6 py-4 text-white">
                    <div className="container mx-auto flex flex-col items-center justify-between text-sm md:ml-0 md:flex-row">
                        <div className="mb-2 md:mb-0">
                            <span className="text-slate-300">Cacao Talk © {new Date().getFullYear()}</span>
                        </div>
                        <div>
                            <span className="text-slate-300">Created by </span>
                            <a
                                href="https://psanguan.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 transition-colors hover:text-cyan-300"
                            >
                                Studentwebsolution
                            </a>
                        </div>
                    </div>
                </footer>
            </div>

            <Toaster position="top-center" />
        </div>
    );
};

export default Layout;
