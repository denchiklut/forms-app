<?php

namespace App\Http\Controllers\Api;

use App\Models\Avto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AvtoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Avto::all());
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
        $avto = new Avto();

        $avto -> name  = $request -> name;
        $avto -> value = $request -> value;
        $avto -> save();

        return response()->json($avto);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $avto = Avto::find($id);

        $avto->update([
            'name'  => $request->input('name'),
            'value' => $request->input('value'),
        ]);

        return response()->json(['message' => 'avto updated successful'.$request->input('name')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Avto::destroy($id);
        return response()->json(['message' => 'Avto deleted successfully']);
    }
}
