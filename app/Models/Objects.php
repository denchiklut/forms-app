<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Objects extends Eloquent
{
    use SoftDeletes;

    protected $table = 'objects';
    protected $guarded = ['id'];
    protected $dates = ['deleted_at'];
}
