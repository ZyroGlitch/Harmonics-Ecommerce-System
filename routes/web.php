<?php

use Illuminate\Support\Facades\Route;

    Route::get('/', function () {
        return inertia('Index');
    })->name('guest.index');

    Route::get('/login',function(){
        return inertia('Login');
    })->name('guest.login');

    Route::get('/register',function(){
        return inertia('Register');
    })->name('guest.register');

    // ----------------------------------------------------------------------------