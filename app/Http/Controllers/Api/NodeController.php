<?php

namespace App\Http\Controllers\Api;

use App\Models\Avto;
use App\Models\Node;
use App\Models\Objects;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


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

        $node = [
            'value'   => $request -> data,
            'project' => $request -> data['project'] ['name']
        ];


        $resulet =  Node::updateOrCreate(['project' => $request -> data['project'] ['name']], $node);

        return $resulet;
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show( $project )
    {

        $project_name = $project;

        $result = Node::where('project', $project_name)->first();


        function findNodeName ($newData)
        {

            if ($newData["idd"] == 0) {
                $newData["name"] = 'start';
            }

            else {
                switch ($newData["type"]) {
                    case 'questions':
                        $newData["value"] =  Question::where('_id',$newData["idd"])->value('name');
                        $newData["webValue"] =  Question::where('_id',$newData["idd"])->value('webName');
                        $newData["name"]  =  mb_strimwidth(Question::where('_id',$newData["idd"])->value('name'), 0 ,11);
                        $newData["nodeSvgShape"] = null;
                        break;
                    case "objects":
                        $newData["value"] =  Objects::where('_id',$newData["idd"])->value('name');
                        $newData["name"]  =  mb_strimwidth(Objects::where('_id',$newData["idd"])->value('name'), 0 ,11);
                        $newData["objData"] =  Objects::where('_id',$newData["idd"])->value('value');
                        break;
                    case "avto":
                        $newData["value"] =  Avto::where('_id',$newData["idd"])->value('name');
                        $newData["name"]  =  mb_strimwidth(Avto::where('_id',$newData["idd"])->value('name'), 0 ,11);
                        $newData["avtData"] =  Avto::where('_id',$newData["idd"])->value('value');
                        break;
                }
            }

            for ($i = 0; $i < count($newData['children']); $i++)
            {
                $newData['children'][$i] = findNodeName( $newData['children'][$i] );
            }

            return $newData;
        }

        return $result ? findNodeName ( $result -> value ) : response()->json([]);
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
    public function update(Request $request, $project)
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
