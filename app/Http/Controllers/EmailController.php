<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailController
{
    public function inbox(){
        return inertia('Customer/Email_Features/Inbox');
    }

    public function sent(){
        return inertia('Customer/Email_Features/Sent');
    }

    public function drafts(){
        return inertia('Customer/Email_Features/Draft');
    }

    public function trash(){
        return inertia('Customer/Email_Features/Trash');
    }
}