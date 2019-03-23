<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Avto extends Eloquent
{
    protected $table = 'avto';
    protected $guarded = ['id'];
}
