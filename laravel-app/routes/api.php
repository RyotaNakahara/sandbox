<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// 認証済みユーザー情報を取得
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

// ログアウト
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    
    return response()->json(['message' => 'Logged out successfully']);
});

Route::middleware('auth:sanctum')->group(function () {
    // ダッシュボード用APIエンドポイント
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'stats'])->name('api.dashboard.stats');
        Route::get('/recent-users', [DashboardController::class, 'recentUsers'])->name('api.dashboard.recent-users');
        Route::get('/system-info', [DashboardController::class, 'systemInfo'])->name('api.dashboard.system-info');
    });
});

