<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Middleware\AdminMiddleware;

Route::middleware(['auth', AdminMiddleware::class])
->name('admin.')
->group(function () {

    Route::get('/admin/dashboard', function () {
        return inertia('Admin/Dashboard');
    })->name('dashboard');

    // --------------------------------------------------------------------------------------

    // Product Routes
    Route::get('/admin/product',[AdminController::class,'product'])
        ->name('product');

    Route::get('/admin/product/view/{product_id}',[AdminController::class,'viewProduct'])
        ->name('viewProduct');

    Route::get('/admin/product/add',[AdminController::class,'addProduct'])
        ->name('addProduct');

    Route::post('/admin/product/store',[AdminController::class,'storeProduct'])
        ->name('storeProduct');

    Route::post('/admin/product/update',[AdminController::class,'updateProduct'])
        ->name('updateProduct');

    // --------------------------------------------------------------------------------------

    Route::get('/admin/orders',[AdminController::class,'orders'])
        ->name('orders');

    Route::get('/admin/sales/report',[AdminController::class,'salesReport'])
        ->name('salesReport');

    // --------------------------------------------------------------------------------------

    // Employee Routes
    Route::get('/admin/employee',[AdminController::class,'employee'])
        ->name('employee');

    Route::get('/admin/employee/add',[AdminController::class,'addEmployee'])
        ->name('addEmployee');
    
    Route::post('/admin/employee/store',[AdminController::class,'storeEmployeeData'])
        ->name('storeEmployeeData');

    Route::get('/admin/employee/viewProfile/{employee_id}',[AdminController::class,'viewProfile'])
        ->name('viewProfile');

    // --------------------------------------------------------------------------------------

    Route::get('/admin/messages',[AdminController::class,'messages'])
        ->name('messages');
    
    Route::get('/admin/logout',[CustomerController::class,'logout'])
        ->name('logout');
});
?>