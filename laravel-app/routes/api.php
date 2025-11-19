<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // ダッシュボード用APIエンドポイント
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'stats'])->name('api.dashboard.stats');
        Route::get('/recent-users', [DashboardController::class, 'recentUsers'])->name('api.dashboard.recent-users');
        Route::get('/system-info', [DashboardController::class, 'systemInfo'])->name('api.dashboard.system-info');
    });
});

