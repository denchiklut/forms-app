<?php

namespace App\Http\Controllers\Api;

use App\Models\Node;
use Illuminate\Http\Request;
use App\Models\Question;
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
        return response()->json(Question::all());
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
        $question = new Question();
        $question -> name    = $request ->    name;
        $question -> project = $request -> project;
        $question -> save();

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
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'question updated successful'.$request->input('name')]);
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
