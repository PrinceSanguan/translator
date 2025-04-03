import { Button } from '@/components/ui/button';
import { BarChart, CreditCard, Home, LogOut, Menu, MessageCircle, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the User interface
interface UserData {
    name: string;
    email: string;
    avatar: string | null;
}

interface SidebarProps {
    user: UserData;
}

const Sidebar = ({ user }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentPath, setCurrentPath] = useState('');

    // Check if we're on mobile screen size and set current path
    useEffect(() => {
        // Set current path from window location
        setCurrentPath(window.location.pathname);

        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        // Check on mount
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleLogout = (): void => {
        // Navigate to logout route
        window.location.href = '/logout';
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Check if link is active
    const isActive = (path: string) => {
        return currentPath === path;
    };

    return (
        <>
            {/* Sidebar - Fixed on desktop, slide-in on mobile */}
            <div
                className={`fixed top-0 left-0 z-40 h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex w-64 flex-col bg-slate-800 text-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0`}
            >
                <div className="relative border-b border-slate-700 p-5">
                    {/* Close button for mobile - positioned inside the header */}
                    {isMobile && (
                        <button
                            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-1 text-white hover:bg-slate-700"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-6 w-6 text-cyan-400" />
                        <h2 className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">Cacao Talk</h2>
                    </div>
                </div>

                {/* User info section - scrollable if needed */}
                <div className="overflow-hidden border-b border-slate-700 p-4 text-ellipsis">
                    <div className="text-sm text-slate-400">Logged in as</div>
                    <div className="truncate font-medium">{user.name}</div>
                    <div className="truncate text-sm text-slate-400">{user.email}</div>
                </div>

                {/* Navigation - scrollable */}
                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-1 p-2">
                        <li>
                            <a
                                href="/dashboard"
                                className={`flex items-center gap-2 rounded-md p-3 transition-colors ${
                                    isActive('/dashboard') ? 'bg-slate-700 font-medium text-cyan-300' : 'hover:bg-slate-700'
                                }`}
                                onClick={() => isMobile && setIsOpen(false)}
                            >
                                <Home className={`h-5 w-5 flex-shrink-0 ${isActive('/dashboard') ? 'text-cyan-300' : 'text-cyan-400'}`} />
                                <span>Dashboard</span>
                            </a>
                        </li>

                        {/* Coming Soon Menu Items */}
                        <li>
                            <div className="flex cursor-not-allowed items-center gap-2 rounded-md p-3 text-slate-400">
                                <User className="h-5 w-5 flex-shrink-0" />
                                <span>Profile</span>
                                <span className="ml-auto rounded bg-slate-700 px-1.5 py-0.5 text-xs font-medium">Soon</span>
                            </div>
                        </li>

                        <li>
                            <div className="flex cursor-not-allowed items-center gap-2 rounded-md p-3 text-slate-400">
                                <CreditCard className="h-5 w-5 flex-shrink-0" />
                                <span>Billing</span>
                                <span className="ml-auto rounded bg-slate-700 px-1.5 py-0.5 text-xs font-medium">Soon</span>
                            </div>
                        </li>

                        <li>
                            <div className="flex cursor-not-allowed items-center gap-2 rounded-md p-3 text-slate-400">
                                <BarChart className="h-5 w-5 flex-shrink-0" />
                                <span>Analytics</span>
                                <span className="ml-auto rounded bg-slate-700 px-1.5 py-0.5 text-xs font-medium">Soon</span>
                            </div>
                        </li>
                    </ul>
                </nav>

                {/* Logout section - always visible at bottom */}
                <div className="border-t border-slate-700 p-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-rose-400 hover:bg-slate-700 hover:text-rose-300"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-5 w-5 flex-shrink-0" /> Sign Out
                    </Button>
                </div>
            </div>

            {/* Mobile toggle button - positioned OUTSIDE the sidebar */}
            {!isOpen && isMobile && (
                <button
                    className="fixed top-5 left-5 z-50 rounded-md bg-slate-800 p-2 text-white shadow-md"
                    onClick={toggleSidebar}
                    aria-label="Open menu"
                >
                    <Menu size={20} />
                </button>
            )}

            {/* Overlay for mobile - closes sidebar when clicking outside */}
            {isMobile && isOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true"></div>
            )}
        </>
    );
};

export default Sidebar;
