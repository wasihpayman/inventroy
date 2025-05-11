<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'description',
    'address',
    'address2',
    'city',
    'postalCode',
    'phone',
  ];

  public function locations()
  {
    $this->hasMany(Location::class);
  }
}
