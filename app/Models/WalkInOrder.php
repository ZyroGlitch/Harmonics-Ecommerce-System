<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalkInOrder extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'subtotal'
    ];

    public function product(){
        return $this->belongsTo((Product::class));
    }
}