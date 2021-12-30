<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Apptodolist;

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
Route::get("/viewlist", [Apptodolist::class, "index"]);
Route::post("/addtodolist", [Apptodolist::class, "add"]);
Route::delete("/deletelist/{id}", [Apptodolist::class, "destroy"]);
Route::get("/edit/{id}", [Apptodolist::class, "edit"]);
Route::put("/update/{id}", [Apptodolist::class, "update"]);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
