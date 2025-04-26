<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'category',
        'description',
        'location',
        'image',
    ];

    /**
     * The attributes that should be cast to native types.
     * 
     * @var array
     */
    protected $casts = [
        'title' => 'string',
        'start_date' => 'date',
        'end_date' => 'date',
        'category' => 'string',
        'description' => 'string',
        'location' => 'string',
        'image' => 'string',
    ];

}
