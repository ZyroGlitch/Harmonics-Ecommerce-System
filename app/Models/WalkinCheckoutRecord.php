<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalkinCheckoutRecord extends Model
{
    protected $fillable = [
        'customer_name',
        'quantity',
        'total',
        'cash_received',
        'change',
        'payment_method',
        'order_status',
    ];
}