<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Node extends Eloquent
{
    use SoftDeletes;

    protected $table = 'nodes';
    protected $guarded = ['id'];
    protected $dates = ['deleted_at'];
}
