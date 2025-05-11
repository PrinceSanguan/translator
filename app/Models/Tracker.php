<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Tracker.php

class Tracker extends Model
{
    protected $fillable = [
        'ip_address',
        'date',
        'user_agent',
        'url'
    ];

    // Modified Scopes
    public function scopeDaily($query)
    {
        return $query->whereDate('date', now()->toDateString());
    }

    public function scopeMonthly($query)
    {
        return $query->whereBetween('date', [
            now()->startOfMonth()->toDateString(),
            now()->endOfMonth()->toDateString()
        ]);
    }
}
