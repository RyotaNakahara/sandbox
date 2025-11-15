<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * ダッシュボード用の統計データを取得
     */
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        $stats = [
            'total_users' => DB::table('users')->count(),
            'registered_today' => DB::table('users')
                ->whereDate('created_at', today())
                ->count(),
            'active_sessions' => DB::table('sessions')
                ->where('last_activity', '>', now()->subHours(24)->timestamp)
                ->count(),
            'cache_entries' => DB::table('cache')->count(),
        ];

        return response()->json($stats);
    }

    /**
     * 最近のユーザー登録を取得
     */
    public function recentUsers(Request $request): JsonResponse
    {
        $users = DB::table('users')
            ->select('id', 'name', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json($users);
    }

    /**
     * システム情報を取得
     */
    public function systemInfo(): JsonResponse
    {
        return response()->json([
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'server_time' => now()->toIso8601String(),
            'timezone' => config('app.timezone'),
        ]);
    }
}

