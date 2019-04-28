<?php

namespace App\Http\Controllers\Api;

use App\Models\Avto;
use App\Models\Objects;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RemovedController extends Controller
{
    public function avto()
    {
        $result = Avto::onlyTrashed()->get();
        return response()->json($result);
    }

    public function object()
    {
        $result = Objects::onlyTrashed()->get();
        return response()->json($result);
    }

    public function question(Request $request)
    {
        $result = Question::onlyTrashed()->where('project', $request->project )->get();
        return response()->json($result);
    }
}
