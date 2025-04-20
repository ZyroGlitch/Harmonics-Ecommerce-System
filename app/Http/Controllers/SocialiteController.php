<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController
{
    public function googleLogin(){
        return Socialite::driver('google')->redirect();
    }

    public function googleAuth(){

        try {
            $google_user = Socialite::driver('google')->user();
            dd($google_user);

            $user = User::where('google_id', $google_user->getId())->first();

            if(!$user){
                $new_user = User::create([
                    'name' => $google_user->getName(),
                    'email' => $google_user->getEmail(),
                    'google_id' => $google_user->getId(),
                ]);

                Auth::login($new_user);

                return redirect()->intended('dashboard');
            }else{
                Auth::login($user);

                return redirect()->intended('dashboard');
            }
        } catch (\Throwable $th) {
            dd('Google login failed!');
        }
    }

}