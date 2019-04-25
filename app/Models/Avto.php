<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Avto extends Eloquent
{
    use SoftDeletes;

    protected $table = 'avto';
    protected $guarded = ['id'];
    protected $dates = ['deleted_at'];
}
