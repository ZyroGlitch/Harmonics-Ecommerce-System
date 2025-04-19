<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController
{
    public function create_account(Request $request) {
        $fields = $request->validate([
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'phone' =>  'required|min:11|max:11|unique:users,phone',
            'address' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        // Hash the password before storing
        $fields['password'] = Hash::make($fields['password']);

        // Create the user
        $user = User::create($fields);

        if ($user) {
            // Log the user in
            Auth::login($user);

            // Regenerate session for security
            $request->session()->regenerate();

            // Redirect to customer dashboard
            return redirect()->route('customer.dashboard');
        }

        // If user creation fails
        return redirect()->back()->with('error', 'Registration failed! Please try again.');
    }

    public function authentication(Request $request){
        // dd($request);
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        if(auth()->attempt($fields)){
             // Regenerate session for security
            $request->session()->regenerate();
            
            $user = auth()->user();

            if($user->role === 'Customer'){
                 // Redirect to customer dashboard
                return redirect()->route('customer.dashboard');
                
            }else if($user->role === 'Admin'){
                 // Redirect to admin dashboard
                return redirect()->route('admin.salesReport');
            }

        }else{
            return redirect()->back()->with('error', 'Login failed! Please try again.');
        }
    }
    
}