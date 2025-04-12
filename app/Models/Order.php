<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'quantity',
        'total',
        'cash_recieved',
        'change',
        'payment_method',
        'receipt_reference',
        'payment_receipt',
        'order_status',
    ];
}