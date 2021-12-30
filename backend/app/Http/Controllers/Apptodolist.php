<?php

namespace App\Http\Controllers;
use App\Models\TodoListModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class Apptodolist extends Controller
{
    //
    public function add(Request $request){
        $validator = Validator::make($request -> all(), [
            "task" => "required",
            "thought" => "required",
            "date" => "required"
        ]);
        if ($validator -> fails()){
            return response() -> json(["status" => 422, "validate_err" => $validator -> errors()]);
        }
        else {
            $todonotes = new TodoListModel();
            $todonotes -> task = $request -> input("task");
            $todonotes -> thought = $request -> input("thought");
            $todonotes -> date = $request -> input("date");
            $todonotes -> save();
            return response()->json(["status" => 200, "message" => "To do list added successfully!"]);
        }
    }

    public function index(){
        $todonotes = TodoListModel::all();
        return response() -> json(["status" => 200, "list" => $todonotes]);

    }

    public function destroy($id){
        $todonotes = TodoListModel::find($id);
        if ($todonotes){
            $todonotes -> delete();
            return response() -> json(["status" => 200, "message" => "To Do List Deleted!"]);
        }
        else return response() -> json(["status" => 404, "message" => "No Task or Thougths found"]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "task" => "required",
            "thought" => "required",
            "date" => "required"
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => 422, "validationError" => $validator->errors()]);
        } 
        else {
            $todonotes = TodoListModel::find($id);

            if ($todonotes){
                $todonotes -> task = $request -> input("task");
                $todonotes -> thought = $request->input("thought");
                $todonotes -> date = $request->input("date");
                $todonotes ->save();
                return response()->json(["status" => 200, "message" => "To do's updated successfully!"]);
            }
            else {
                return response()->json(["status" => 404, "message" => "No to do list found!"]);
            }
        }
    }


    public function edit($id)
    {
        $todonotes = TodoListModel::find($id);
        if ($todonotes) return response()->json(["status" => 200, "todolist" => $todonotes]);
        else return response()->json(["status" => 404, "message" => "No Notes ID found!"]);
    }

}
