<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'user_id',
        'quantity',
        'total',
    ];

    public function product(){
        return $this->belongsTo((Product::class));
    }

    public function user(){
        return $this->belongsTo((User::class));
    }

    public function order(){
        return $this->belongsTo((Order::class));
    } 
}