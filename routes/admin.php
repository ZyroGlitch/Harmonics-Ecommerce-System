<?php

use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;

Route::middleware(['auth', AdminMiddleware::class])
    ->name('admin.')
    ->group(function () {

        Route::get('/admin/sales/report', [AdminController::class, 'salesReport'])
            ->name('salesReport');

        Route::get('/admin/sales/salesInvoice', [AdminController::class, 'salesInvoice'])
            ->name('salesInvoice');

        // --------------------------------------------------------------------------------------
    
        // Product Routes
        Route::get('/admin/product', [AdminController::class, 'product'])
            ->name('product');

        Route::get('/admin/product/view/{product_id}', [AdminController::class, 'viewProduct'])
            ->name('viewProduct');

        Route::get('/admin/product/add', [AdminController::class, 'addProduct'])
            ->name('addProduct');

        Route::post('/admin/product/store', [AdminController::class, 'storeProduct'])
            ->name('storeProduct');

        Route::post('/admin/product/update', [AdminController::class, 'updateProduct'])
            ->name('updateProduct');

        // --------------------------------------------------------------------------------------
    
        Route::get('/admin/orders', [AdminController::class, 'orders'])
            ->name('orders');

        // --------------------------------------------------------------------------------------
    
        // Employee Routes
        Route::get('/admin/employee', [AdminController::class, 'employee'])
            ->name('employee');

        Route::get('/admin/employee/add', [AdminController::class, 'addEmployee'])
            ->name('addEmployee');

        Route::post('/admin/employee/store', [AdminController::class, 'storeEmployeeData'])
            ->name('storeEmployeeData');

        Route::get('/admin/employee/viewProfile/{employee_id}', [AdminController::class, 'viewProfile'])
            ->name('viewProfile');

        Route::post('/admin/employee/update/info', [AdminController::class, 'updateUserInfo'])
            ->name('updateUserInfo');

        Route::post('/admin/employee/update/password', [AdminController::class, 'updatePassword'])
            ->name('updatePassword');

        // --------------------------------------------------------------------------------------
    
        Route::get('/admin/customer', [AdminController::class, 'customer'])
            ->name('customer');

        // --------------------------------------------------------------------------------------
    
        Route::get('/admin/profile', [AdminController::class, 'profile'])
            ->name('profile');

        Route::post('/admin/profile/update/info', [AdminController::class, 'updateAdminInfo'])
            ->name('updateAdminInfo');

        Route::post('/admin/profile/update/imageProfile', [AdminController::class, 'updateAdminProfile'])
            ->name('updateAdminProfile');

        Route::post('/admin/profile/update/password', [AdminController::class, 'updateAdminPassword'])
            ->name('updateAdminPassword');

        // --------------------------------------------------------------------------------------
    
        Route::get('/admin/logout', [AdminController::class, 'logout'])
            ->name('logout');
    });
?>