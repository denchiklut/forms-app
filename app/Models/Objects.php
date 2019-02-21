<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Objects extends Eloquent
{
    protected $table = 'objects';
    protected $guarded = ['id'];
}
