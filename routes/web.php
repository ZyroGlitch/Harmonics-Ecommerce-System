<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Middleware\CustomerMiddleware;
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

    Route::post('/create/account',[AuthController::class,'create_account'])
    ->name('guest.create_account');

    Route::post('/authentication',[AuthController::class,'authentication'])
    ->name('guest.authentication');

    // ----------------------------------------------------------------------------

    Route::middleware(['auth', CustomerMiddleware::class])
    ->name('customer.')
    ->group(function () {
        
        Route::get('/dashboard',function(){
            return inertia('Customer/Products');
        })
        ->name('dashboard');

        // --------------------------------------------------------------------------------------
        // Profile Routes

        Route::get('/profile',[CustomerController::class,'profile'])
        ->name('profile');

        Route::post('/profile/update/info',[CustomerController::class,'updateProfile'])
        ->name('updateProfile');

        Route::post('/profile/update/imageProfile',[CustomerController::class,'updateImageProfile'])
        ->name('updateImageProfile');

        Route::post('/profile/update/password',[CustomerController::class,'updatePassword'])
        ->name('updatePassword');

         // --------------------------------------------------------------------------------------
        
        Route::get('/customer/logout',[CustomerController::class,'logout'])
        ->name('logout');
    });

require __DIR__.'/admin.php';