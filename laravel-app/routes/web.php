<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // ダッシュボード用APIエンドポイント
    Route::prefix('api/dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'stats'])->name('api.dashboard.stats');
        Route::get('/recent-users', [DashboardController::class, 'recentUsers'])->name('api.dashboard.recent-users');
        Route::get('/system-info', [DashboardController::class, 'systemInfo'])->name('api.dashboard.system-info');
    });
});

require __DIR__.'/auth.php';
