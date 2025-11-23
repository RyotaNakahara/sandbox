<?php

use Illuminate\Support\Facades\Route;

// SPA用：すべてのルートでapp.blade.phpを返す
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
