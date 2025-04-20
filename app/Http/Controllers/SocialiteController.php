<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController
{
    public function googleLogin(){
        return Socialite::driver('google')->redirect();
    }

    public function googleAuth(){

        try {
            $google_user = Socialite::driver('google')->user();
            // dd($google_user);

            $user = User::where('google_id', $google_user->getId())->first();

            if($user){
                Auth::login($user);

                return redirect()->route('customer.dashboard');
            }else{
            $new_user = User::create([
                    'firstname' => $google_user->user['given_name'] ?? null,
                    'lastname' => $google_user->user['family_name'] ?? null,
                    'email' => $google_user->getEmail(),
                    'google_id' => $google_user->getId(),
                    'password' => Hash::make('Pokemongo$29'), 
                    'profile' => $google_user->getAvatar(),
                ]);

                Auth::login($new_user);

                return redirect()->route('customer.dashboard');
            }
        } catch (\Throwable $th) {
            dd('Google login failed!');
        }
    }

}