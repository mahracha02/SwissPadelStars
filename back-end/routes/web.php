<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//create a route to get access to the admin panel
Route::get('/admin', function () {
    return view('admin');
});