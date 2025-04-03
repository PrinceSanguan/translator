import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { Calendar, Eye, Users } from 'lucide-react';

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    users: any[];
    analytics: {
        dailyVisits: number;
        monthlyVisits: number;
        topPages: { url: string; count: number }[];
        dailyUniqueVisitors: number;
        monthlyUniqueVisitors: number;
    };
}

export default function AdminDashboard({ users, analytics }: { users: any[]; analytics: PageProps['analytics'] }) {
    const { auth } = usePage().props as PageProps;

    // User percentage calculation logic
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthUsers = users.filter((user) => {
        const userDate = new Date(user.created_at);
        return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
    }).length;

    const previousMonthUsers = users.filter((user) => {
        const userDate = new Date(user.created_at);
        return userDate.getMonth() === currentMonth - 1 && userDate.getFullYear() === currentYear;
    }).length;

    const percentageChange = previousMonthUsers !== 0 ? (((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100).toFixed(1) : '100';

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header with logout button */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin Panel</div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{auth.user.name}</span>
                            <button
                                onClick={() => router.get('/logout')}
                                className="rounded-lg px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mx-auto max-w-6xl">
                        {/* Analytics Dashboard Section */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Analytics</h1>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Website traffic and user engagement metrics</p>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {/* Daily Visits Card */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Daily Visits</CardTitle>
                                        <Eye size={16} className="text-gray-500 dark:text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{analytics.dailyVisits}</div>
                                        <p className="text-xs text-gray-500">Page views today</p>
                                    </CardContent>
                                </Card>

                                {/* Monthly Visits Card */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Monthly Visits</CardTitle>
                                        <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{analytics.monthlyVisits}</div>
                                        <p className="text-xs text-gray-500">Total views this month</p>
                                    </CardContent>
                                </Card>

                                {/* Daily Unique Visitors */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Daily Unique Visitors</CardTitle>
                                        <Users size={16} className="text-gray-500 dark:text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{analytics.dailyUniqueVisitors}</div>
                                        <p className="text-xs text-gray-500">Unique visitors today</p>
                                    </CardContent>
                                </Card>

                                {/* Monthly Unique Visitors */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Monthly Unique Visitors</CardTitle>
                                        <Users size={16} className="text-gray-500 dark:text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{analytics.monthlyUniqueVisitors}</div>
                                        <p className="text-xs text-gray-500">Unique visitors this month</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Top Pages Section */}
                            <div className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Most Visited Pages</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[600px]">
                                                <thead className="border-b">
                                                    <tr>
                                                        <th className="p-4 text-left">URL</th>
                                                        <th className="p-4 text-right">Visits</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {analytics.topPages.map((page, index) => (
                                                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                                            <td className="p-4 text-sm font-medium">{page.url}</td>
                                                            <td className="p-4 text-right">{page.count}</td>
                                                        </tr>
                                                    ))}
                                                    {analytics.topPages.length === 0 && (
                                                        <tr>
                                                            <td colSpan={2} className="p-4 text-center text-gray-500">
                                                                No data available
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* User Management Section */}
                        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">Manage all registered users ({users.length} total)</p>
                            </div>

                            <Card className="w-full md:w-auto">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                                    <Users size={16} className="text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{currentMonthUsers}</div>
                                    <p className={`flex items-center text-xs ${Number(percentageChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {Number(percentageChange) >= 0 ? '↑' : '↓'}
                                        {Math.abs(Number(percentageChange))}% from last month
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardContent className="overflow-x-auto p-0">
                                <table className="w-full min-w-[600px]">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="p-4 text-left">User</th>
                                            <th className="p-4 text-left">Role</th>
                                            <th className="p-4 text-left">Last Login</th>
                                            <th className="p-4 text-left">Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="p-4">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="p-4 capitalize">{user.user_role}</td>
                                                <td className="p-4">
                                                    {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never'}
                                                </td>
                                                <td className="p-4">{new Date(user.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
