declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: {
                name: string;
                email: string;
            };
        };
        users: User[];
    }
}

interface User {
    id: number;
    name: string;
    email: string;
    user_role: string;
    created_at: string;
    last_login_at: string | null;
    translations_count: number;
}
