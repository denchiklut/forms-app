<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Question extends Eloquent
{
    use SoftDeletes;

    protected $table = 'questions';
    protected $guarded = ['id'];
    protected $dates = ['deleted_at'];
}
