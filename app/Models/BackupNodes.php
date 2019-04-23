<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BackupNodes extends Eloquent
{
    protected $table = 'backups';
    protected $guarded = ['id'];
}
