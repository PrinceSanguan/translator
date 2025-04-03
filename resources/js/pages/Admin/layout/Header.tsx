import { router } from '@inertiajs/react';

interface HeaderProps {
    user?: {
        name: string;
        email: string;
    };
}

export function Header({ user }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin Panel</div>
                <div className="flex items-center gap-4">
                    {user && (
                        <>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
                            <button
                                onClick={() => router.get('/logout')}
                                className="rounded-lg px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
