<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class CustomerController
{
    public function profile(){
        $user = auth()->user();
        $customer = User::find($user->id)->fresh();

        return inertia('Customer/Profile', ['customer' => $customer])->withViewData(['timestamp' => now()]);
    }

    public function updateProfile(Request $request){
        // dd($request);

        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|email|unique:users,email',
        ]);

        $user = auth()->user();

        $updateInfo = User::where('id',$user->id)->update([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'phone' => $fields['phone'],
            'address' => $fields['address'],
            'email' => $fields['email'],
        ]);
        
        if($updateInfo){
            return redirect()->route('customer.profile')
            ->with('success','All your information has been updated successfully.');
        }else{
            return redirect()->back()
            ->with('error','Your information update was unsuccessful.');
        }
    }

    public function updateImageProfile(Request $request){
        $request->validate([
            'profile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = auth()->user();

        if($request->hasFile('profile')){
            $fields['profile'] = Storage::disk('public')->put('profiles',$request->profile);

            // Update the null profile of the user
            $profile = User::where('id',$user->id)->update([
                'profile' => $fields['profile'],
            ]);

            if($profile){
                return redirect()->route('customer.profile')
                ->with('success','Your profile image has been updated successfully.');
            }else{
                return redirect()->back()->with('error','Your profile image update has failed.');
            }
        }
    }

    public function updatePassword(Request $request){
        $fields = $request->validate([
            'new_password' => [
            'required',
            'string',
            Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols(),
        ],
        'confirm_password' => [
            'required',
            'string',
            Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols(),
        ],
        ]);

        if($fields['new_password'] === $fields['confirm_password']){
            $fields['new_password'] = Hash::make($fields['new_password']);

            $user = auth()->user(); // Get the authenticated user

            $updatePassword = User::where('id',$user->id)->update([
                'password' =>  $fields['new_password'],
            ]);

            if($updatePassword){
                return redirect()->route('customer.profile')
                ->with('success','Password update successfully.');
            }else{
                return redirect()->back()-with('error','Updating password failed.');
            }
        }
    }

    public function logout(Request $request){
        Auth::logout();

         // Invalidate and regenerate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('guest.login');
    }
}