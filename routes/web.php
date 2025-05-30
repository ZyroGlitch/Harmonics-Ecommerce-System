<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SocialiteController;
use App\Http\Middleware\CustomerMiddleware;
use Illuminate\Support\Facades\Route;

    // This function will trigger if page not found or 404 page not found
    // Route::fallback(function(){
    //     return redirect()->route('guest.index');
    // });

    Route::middleware('guest')->name('guest.')->group(function () {
        Route::get('/', function () {
            return inertia('Index');
        })->name('index');

        Route::get('/login',function(){
            return inertia('LoginV2');
        })->name('login');

        Route::get('/register',function(){
            return inertia('RegisterV2');
        })->name('register');

        Route::post('/create/account',[AuthController::class,'create_account'])
        ->name('create_account');

        Route::post('/authentication',[AuthController::class,'authentication'])
        ->name('authentication');

        Route::get('/google/login',[SocialiteController::class,'googleLogin'])
        ->name('google_login');

        Route::get('/auth/google',[SocialiteController::class,'googleAuth'])
        ->name('google_auth');

        Route::get('/facebook/login',[SocialiteController::class,'facebookLogin'])
        ->name('facebookLogin');

        Route::get('/auth/facebook',[SocialiteController::class,'facebookAuth'])
        ->name('facebookAuth');
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

        Route::post('/dashboard/direct/buy/order',[OrderController::class,'directProductOrder'])
        ->name('directProductOrder');

        Route::post('/dashboard/buy/product/feedback',[FeedbackController::class,'feedback'])
        ->name('feedback');
        
        
        // --------------------------------------------------------------------------------------

        // Cart Routes
        Route::get('/cart',[CartController::class,'cart'])
        ->name('cart');

        Route::delete('/cart/delete/selected/{cart_id}',[CartController::class,'cart_delete'])
        ->name('cart_delete');

        Route::get('/cart/delete/{cart_id}',[CartController::class,'remove_cart'])
        ->name('remove_cart');

        Route::post('/cart/checkout/',[CartController::class,'checkout'])
        ->name('checkout');

        Route::get('/cart/checkout/invoice/{order_id}',[CartController::class,'invoice'])
        ->name('invoice');

        // --------------------------------------------------------------------------------------

        Route::get('/orders',[OrderController::class,'orders'])
        ->name('orders');

        // --------------------------------------------------------------------------------------

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
        
        Route::get('/inbox',[EmailController::class,'inbox'])
        ->name('inbox');

        Route::get('/sent',[EmailController::class,'sent'])
        ->name('sent');

        Route::get('/drafts',[EmailController::class,'drafts'])
        ->name('drafts');

        Route::get('/trash',[EmailController::class,'trash'])
        ->name('trash');
        
        Route::get('/customer/logout',[CustomerController::class,'logout'])
        ->name('logout');
    });

require __DIR__.'/manager.php';
require __DIR__.'/admin.php';