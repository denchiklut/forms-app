<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\QuestionsAnswers;
use App\Models\AnswersQuestions;


class NodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $project_name = 'Afghanistan';

        $result =   QuestionsAnswers::where('questions_answers.project', $project_name)
            ->join('questions', 'questions.id', '=', 'questions_answers.question_id')
            ->join('answers_questions', 'answers_questions.id', '=', 'questions_answers.answers_id')
            ->select('questions_answers.project','questions.val','answers_questions.answer','questions_answers.question_id','questions_answers.answers_id')
            ->get();

        $der_arrays = array_merge_recursive($result->toArray()[0], $result->toArray()[1]);

        foreach ($der_arrays as $key =>  $der_array)
        {
            count(array_unique($der_arrays[$key])) == 1 ? $der_arrays[$key] = $der_arrays[$key][0] : $der_arrays[$key] = array_unique($der_arrays[$key]);


            if ($key == 'answer')
            {
                foreach ($der_arrays[$key] as $k => $value)
                {
                    $der_arrays[ $key ] [$k] = [
                        'val' =>  $der_arrays [ $key ][ $k ],
                        'id'  =>  $der_arrays ['answers_id' ][ $k ],
                    ];
                }
            }



        }

        // [{project: "Afghanistan", question_id: 45, val: "Хотите машину?", answer: [{val:"Да", id: 14}, {val:"Нет", id: 15}]}]
        return $der_arrays;

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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
