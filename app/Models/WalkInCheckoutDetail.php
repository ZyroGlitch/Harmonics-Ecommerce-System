<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalkInCheckoutDetail extends Model
{
    protected $fillable = [
        'checkout_rec_id',
        'product_id',
        'quantity',
        'subtotal',
    ];

    public function checkout_orders()
    {
        return $this->belongsTo(WalkinCheckoutRecord::class, 'checkout_rec_id');
    }

    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}