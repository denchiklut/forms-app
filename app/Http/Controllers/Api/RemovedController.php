<?php

namespace App\Http\Controllers\Api;

use App\Models\Avto;
use App\Models\Objects;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RemovedController extends Controller
{

    public function index(Request $request)
    {
        $avto      = Avto::onlyTrashed()->get();
        $objects   = Objects::onlyTrashed()->get();
        $questions = Question::onlyTrashed()->where('project', $request->project )->get();

        return response()->json(['avto' => $avto, 'objects' => $objects, 'questions' => $questions]);
    }
}
