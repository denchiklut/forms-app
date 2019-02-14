<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AnswersQuestions extends Eloquent
{
    protected $table = 'answers_questions';
    protected $guarded = ['id'];
}
