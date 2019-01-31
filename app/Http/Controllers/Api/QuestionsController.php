<?php
namespace App\Http\Controllers\Api;

use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionsResource;

class QuestionsController extends Controller
{
    public function index()
    {
        return response()->json(QuestionsResource::collection(Question::all()));
    }
}
