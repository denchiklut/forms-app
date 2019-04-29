<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|




*/
Route::namespace('Api')->group(function () {

    Route::resource('/avto',          'AvtoController');
    Route::resource('/nodes',         'NodeController');
    Route::resource('/backup',      'BackupController');
    Route::resource('/objects',     'ObjectController');
    Route::resource('/questions', 'QuestionController');

    Route::post('/restore', 'BackupController@restore');

    Route::get('/removed/{project}', 'RemovedController@index');
});
