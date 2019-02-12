<?php

namespace App\Http\Controllers\Api;

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

        if (Question::where('project',$project_name)->exists()) {
            $question = new Question();
            $question -> val     = $request -> val;
            $question -> project = $request -> project;
            $question -> save();



        } else {


            $question = new Question();
            $question -> val     = $request -> val;
            $question -> project = $request -> project;
            $question -> save();


            //Добавляем ответы 'Да' и 'Нет' на первый вопрос
            $aq = new AnswersQuestions();
            $aq -> uniq_name = $project_name;
            $aq -> question_id = $question->id;
            $aq -> answer = 'Да';
            $aq -> save();


            // Пишу в таблицу question_to_answers (Только для первого вопроса Ответа 'Да')
            $qa = new QuestionsAnswers();
            $qa -> uniq_name = $project_name;
            $qa -> question_id = $question -> id;
            $qa -> answers_id = $aq -> id;
            $qa -> save();


            //Добавляем ответы 'Да' и 'Нет' на первый вопрос
            $aq = new AnswersQuestions();
            $aq -> uniq_name = $project_name;
            $aq -> question_id = $question->id;
            $aq -> answer = 'Нет';
            $aq -> save();

            // Пишу в таблицу question_to_answers (Только для первого вопроса Ответа 'Нет')
            $qa = new QuestionsAnswers();
            $qa -> uniq_name = $project_name;
            $qa -> question_id = $question -> id;
            $qa -> answers_id = $aq -> id;
            $qa -> save();
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


        return response()->json(QuestionsResource::collection($resulet));
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
            'val' => $request->input('val'),
        ]);

        return response()->json(['message' => 'question updated successful'.$request->input('val')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Question::destroy($id);
        return response()->json(['message' => 'Question deleted successfully']);
    }
}
