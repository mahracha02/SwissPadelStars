<?php

use Filament\Pages\Dashboard;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

require __DIR__.'/auth.php';

Route::get('/', function () {
    Route::get('/', Dashboard::class)->name('dashboard');
});