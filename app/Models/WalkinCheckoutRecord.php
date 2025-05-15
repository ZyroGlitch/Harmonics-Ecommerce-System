<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalkinCheckoutRecord extends Model
{
    protected $fillable = [
        'user_id',
        'customer_name',
        'quantity',
        'total',
        'cash_received',
        'change',
        'payment_method',
        'order_status',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}