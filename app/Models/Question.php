<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Question extends Eloquent
{
    protected $table = 'questions';
    protected $guarded = ['id'];
}
