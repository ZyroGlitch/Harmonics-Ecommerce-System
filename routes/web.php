<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Middleware\CustomerMiddleware;
use Illuminate\Support\Facades\Route;

    Route::middleware('guest')->name('guest.')->group(function () {
        Route::get('/', function () {
            return inertia('Index');
        })->name('index');

        Route::get('/login',function(){
            return inertia('Login');
        })->name('login');

        Route::get('/register',function(){
            return inertia('Register');
        })->name('register');

        Route::post('/create/account',[AuthController::class,'create_account'])
        ->name('create_account');

        Route::post('/authentication',[AuthController::class,'authentication'])
        ->name('authentication');
    });

    Route::middleware(['auth', CustomerMiddleware::class])
    ->name('customer.')
    ->group(function () {
        
        // --------------------------------------------------------------------------------------

        // Product Routes
        Route::get('/dashboard',[CustomerController::class,'product'])
        ->name('dashboard');

        Route::get('/dashboard/show/product/{product_id}',[CustomerController::class,'showProduct'])
        ->name('showProduct');

        Route::post('/dashboard/add/cart',[CartController::class,'addToCart'])
        ->name('addToCart');

        Route::get('/dashboard/buy/product/{product_id}/{quantity}',[CartController::class,'buyProduct'])
        ->name('buyProduct');
        
        // --------------------------------------------------------------------------------------

        Route::get('/cart',function(){
            return inertia('Customer/Cart');
        })
        ->name('cart');

        Route::get('/orders',function(){
            return inertia('Customer/Orders');
        })
        ->name('orders');

        Route::get('/about',function(){
            return inertia('Customer/About');
        })
        ->name('about');

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