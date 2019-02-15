<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Node extends Eloquent
{
    protected $table = 'nodes';
    protected $guarded = ['id'];
}
