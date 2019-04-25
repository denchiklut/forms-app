<?php

namespace App\Http\Controllers\Api;

use App\Models\Avto;
use App\Models\BackupNodes;
use App\Models\Node;
use App\Models\Objects;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BackupController extends Controller
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
        $backup = new BackupNodes();

        $backup -> project      = $request -> project;
        $backup -> description  = $request -> desc;
        $backup -> value        = $request -> nodes;
        $backup -> user        = $request -> user;

        $backup -> save();

        return response()->json($backup);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($project)
    {
        $project_name = $project;

        $result = BackupNodes::where('project',$project_name)->get();


        return $result;
    }


    public function restore(Request $request)
    {

        $project_name = $request -> project;

        $node = Node::where('project', $project_name)->first();
        $node->update(['value' => $request -> value]);


        function findNodeName ($newData)
        {

            if (!isset( $newData['children'] ))
            {
                $newData['children'] = [];
            }


            if ($newData["idd"] == 0) {
                $newData["name"] = 'start';
            } else {
                switch ($newData["type"]) {
                    case 'questions':
                        Question::where('_id', $newData["idd"])->update(['name' => $newData["value"], 'webName' => $newData["webValue"]]);
                        break;
                    case "objects":
                        Objects::where('_id', $newData["idd"])->update(['name' => $newData["value"], 'value' => $newData["objData"]]);
                        break;
                    case "avto":
                        Avto::where('_id', $newData["idd"])->update(['name' => $newData["value"], 'value' => $newData["avtData"]]);
                        break;
                }
            }

            if (isset( $newData['children'] ))
            {
                for ($i = 0; $i < count($newData['children']); $i++)
                {
                    $newData['children'][$i] = findNodeName( $newData['children'][$i] );
                }
            }


            return $newData;
        }

        return $node ? findNodeName ( $node -> value ) : response()->json([]);
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
