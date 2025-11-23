import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Stats {
    total_users: number;
    registered_today: number;
    active_sessions: number;
    cache_entries: number;
}

interface SystemInfo {
    php_version: string;
    laravel_version: string;
    server_time: string;
    timezone: string;
}

interface RecentUser {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, systemInfoRes, recentUsersRes] = await Promise.all([
                    axios.get('/api/dashboard/stats'),
                    axios.get('/api/dashboard/system-info'),
                    axios.get('/api/dashboard/recent-users'),
                ]);

                setStats(statsRes.data);
                setSystemInfo(systemInfoRes.data);
                setRecentUsers(recentUsersRes.data);
            } catch (error: any) {
                console.error('Failed to fetch dashboard data:', error);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ja-JP');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* クイックリンク */}
                    <div className="mb-6">
                        <Link
                            to="/information"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            映画情報ページへ
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="mt-2 text-gray-600">読み込み中...</p>
                        </div>
                    ) : (
                        <>
                            {/* 統計カード */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="text-sm font-medium text-gray-500">総ユーザー数</div>
                                        <div className="mt-2 text-3xl font-bold text-gray-900">
                                            {stats?.total_users ?? 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="text-sm font-medium text-gray-500">今日の新規登録</div>
                                        <div className="mt-2 text-3xl font-bold text-green-600">
                                            {stats?.registered_today ?? 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="text-sm font-medium text-gray-500">アクティブセッション</div>
                                        <div className="mt-2 text-3xl font-bold text-blue-600">
                                            {stats?.active_sessions ?? 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="text-sm font-medium text-gray-500">キャッシュエントリ</div>
                                        <div className="mt-2 text-3xl font-bold text-purple-600">
                                            {stats?.cache_entries ?? 0}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* 最近のユーザー */}
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900">最近のユーザー</h3>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {recentUsers.length === 0 ? (
                                            <div className="p-6 text-center text-gray-500">
                                                ユーザーが登録されていません
                                            </div>
                                        ) : (
                                            recentUsers.map((user) => (
                                                <div key={user.id} className="p-6 hover:bg-gray-50">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            {formatDate(user.created_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* システム情報 */}
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900">システム情報</h3>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {systemInfo && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-500">PHP Version</span>
                                                    <span className="text-sm text-gray-900">{systemInfo.php_version}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-500">Laravel Version</span>
                                                    <span className="text-sm text-gray-900">{systemInfo.laravel_version}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-500">Timezone</span>
                                                    <span className="text-sm text-gray-900">{systemInfo.timezone}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-500">Server Time</span>
                                                    <span className="text-sm text-gray-900">
                                                        {formatDate(systemInfo.server_time)}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
