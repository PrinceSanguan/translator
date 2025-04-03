import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { BarChart2, ChevronDown, CreditCard, HelpCircle, LayoutDashboard, Package, Settings, ShoppingCart, Users } from 'lucide-react';

export function Sidebar() {
    return (
        <div className="hidden w-64 flex-col border-r bg-white md:flex dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-16 items-center border-b px-4 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Portal</h2>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-2 text-sm font-medium">
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Users size={18} />
                        Users
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <ShoppingCart size={18} />
                        Orders
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Package size={18} />
                        Products
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <BarChart2 size={18} />
                        Analytics
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <CreditCard size={18} />
                        Payments
                    </Button>
                    <Separator className="my-2" />
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Settings size={18} />
                        Settings
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <HelpCircle size={18} />
                        Help Center
                    </Button>
                </nav>
            </div>
            {/* Profile Section */}
            <div className="border-t p-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/api/placeholder/32/32" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">admin@company.com</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                                <ChevronDown size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
