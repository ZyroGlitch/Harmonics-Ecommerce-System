<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalkInCheckoutDetail extends Model
{
    protected $fillable  = [
        'product_id',
        'quantity',
        'subtotal',
    ];
}