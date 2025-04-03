import Layout from '@/components/user/Layout';
import TranslationContent from '@/components/user/TranslatationContent';

// Define the User interface
interface UserData {
    name: string;
    email: string;
    avatar: string | null;
    translations_count: number;
    joined_date: string;
    last_login: string | null;
}

// Define the props interface
interface DashboardProps {
    user: UserData;
}

const Dashboard = ({ user }: DashboardProps) => {
    return (
        <Layout user={user}>
            <TranslationContent />
        </Layout>
    );
};

export default Dashboard;
