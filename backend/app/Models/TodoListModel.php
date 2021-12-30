<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoListModel extends Model
{
    use HasFactory;

    protected $table = "todolists";
    protected $fillable = ["task", "thought", "date"];
}
