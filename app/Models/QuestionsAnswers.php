<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class QuestionsAnswers extends Eloquent
{
    protected $table = 'questions_answers';
    protected $guarded = ['id'];
}
