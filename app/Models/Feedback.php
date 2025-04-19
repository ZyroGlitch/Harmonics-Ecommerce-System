<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'stars',
        'title',
        'appearance_rating',
        'quality_rating',
        'message',
        'images',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}