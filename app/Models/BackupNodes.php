<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class BackupNodes extends Eloquent
{
    use SoftDeletes;

    protected $table = 'backups';
    protected $guarded = ['id'];
    protected $dates = ['deleted_at'];
}
