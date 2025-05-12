<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
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
            $existingUser = User::where('email', $google_user->getEmail())->first();

            if($user || $existingUser){
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

    public function facebookLogin(){
        return Socialite::driver('facebook')->redirect();
    }

    public function facebookAuth() {
        try {
            $facebookUser = Socialite::driver('facebook')
            ->fields(['first_name', 'last_name', 'email'])
            ->user();

            // dd($facebookUser);
            
            // Check if a user already exists with this Facebook ID
            $user = User::where('facebook_id', $facebookUser->getId())->first();

            if ($user) {
                 // Log in existing user
                Auth::login($user);

                return redirect()->route('customer.dashboard');
            } else {
                // Check if email exists to avoid duplicate accounts
                $existingUser = User::where('email', $facebookUser->getEmail())->first();

                if ($existingUser) {
                    // Link Facebook ID to existing user
                    $existingUser->update(['facebook_id' => $facebookUser->getId()]);
                    Auth::login($existingUser);

                    return redirect()->route('customer.dashboard');
                } else {
                    // Create a new user
                    $new_user = User::create([
                        'firstname' =>  $facebookUser->user['first_name'] ?? $facebookUser->getName(),
                        'lastname' => $facebookUser->user['last_name'] ?? $facebookUser->getName(),
                        'email' => $facebookUser->user['email'] ?? $facebookUser->getEmail(),
                        'facebook_id' => $facebookUser->getId(),
                        'password' => Hash::make(Str::random(16)), 
                        'profile' => $facebookUser->getAvatar(),
                    ]);

                    Auth::login($new_user);
                    return redirect()->route('customer.dashboard');
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Facebook login failed. Please try again.');
        }
    }

}