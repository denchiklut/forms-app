<?php

namespace App\Http\Controllers\Api;

use App\Models\Node;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\QuestionsAnswers;
use App\Models\AnswersQuestions;
use App\Http\Resources\QuestionsResource;
use App\Http\Controllers\Controller;


class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(QuestionsResource::collection(Question::all()));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Временно делаем запрос лишний!!! чтобы понять первый ли это вопрос с таким project
        $project_name = $request -> project;

        if ( Question::where('project',$project_name)->exists() ) {
            $question = new Question();
            $question -> value   = $request -> value;
            $question -> project = $request -> project;
            $question -> save();



        } else {


            $question = new Question();
            $question -> value     = $request -> value;
            $question -> project = $request -> project;
            $question -> save();


            //Добавляем ответы 'Да' и 'Нет' на первый вопрос
        } ;

        return response()->json($question);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($project)
    {
        $project_name = $project;

        $resulet = Question::where('project',$project_name)->get();


        return $resulet;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $question = Question::find($id);

        $question->update([
            'value' => $request->input('value'),
        ]);

        return response()->json(['message' => 'question updated successful'.$request->input('value')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $question = Question::find($id);

        $graf = Node::where('project', $question->project)->value('value');
        $check = false;
        function findQuestion ($graf, $id, &$check)
        {
            var_dump("{$graf["idd"]}-{$id}");
            if ($graf["idd"] == $id)
            {
                $check = true;
            }else
            {
                for ($i = 0; $i < count($graf['children']); $i++)
                {

                   findQuestion( $graf['children'][$i], $id, $check);
                }
            }
            return false;
        }

        findQuestion ( $graf, $id, $check );


        if ($check)
        {
            return response()->json(['message' => 'Can`t remove it']);
        }
        else
            {
                Question::destroy($id);
                return response()->json(['message' => 'Question deleted successfully']);
            }
    }
}
