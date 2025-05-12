<?php
use App\Http\Controllers\ManagerController;
use App\Http\Middleware\ManagerMiddleware;

Route::middleware(['auth', ManagerMiddleware::class])->name('manager.')->group(function () {
    Route::get('/manager/dashboard',[ManagerController::class, 'dashboard'])
    ->name('dashboard');

    Route::post('/manager/order/enlist',[ManagerController::class, 'enlist_product'])
    ->name('enlistProduct');

    // --------------------------------------------------------------------------------
    // Cart Routes
    Route::get('/manager/cart',[ManagerController::class, 'cart'])
    ->name('cart');

    Route::post('/manager/checkout',[ManagerController::class, 'checkout'])
    ->name('checkout');

    Route::get('/manager/product',[ManagerController::class, 'product'])
    ->name('product');

    // --------------------------------------------------------------------------------
    // Product Routes
    Route::get('/manager/product', [ManagerController::class, 'product'])
    ->name('product');

    Route::get('/manager/product/view/{product_id}', [ManagerController::class, 'viewProduct'])
        ->name('viewProduct');

    Route::get('/manager/product/add', [ManagerController::class, 'addProduct'])
        ->name('addProduct');

    Route::post('/manager/product/store', [ManagerController::class, 'storeProduct'])
        ->name('storeProduct');

    Route::post('/manager/product/update', [ManagerController::class, 'updateProduct'])
        ->name('updateProduct');
    // --------------------------------------------------------------------------------


    Route::get('/manager/orders',[ManagerController::class, 'orders'])
    ->name('orders');

    Route::get('/manager/profile',[ManagerController::class, 'profile'])
    ->name('profile');

    Route::get('/manager/logout',[ManagerController::class, 'logout'])
    ->name('logout');
});