<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class AdminController
{
    // ---------------------------------------------------------------------------------------

    // Product Functions
    public function product(Request $request) {
        $query = Product::select('id','product_name', 'description', 'category', 'price', 'stocks', 'status', 'image');

        // Search by product name
        if ($request->filled('searchByName')) {
            $query->where('product_name', 'like', '%' . $request->searchByName . '%');
        }

        // Sorting by price range
        if ($request->filled('sortByPrice')) {
            switch ($request->sortByPrice) {
                case 'low price':
                    $query->where('price', '<', 1000);
                    break;
                case 'mid price':
                    $query->whereBetween('price', [1000, 4999]);
                    break;
                case 'high price':
                    $query->where('price', '>=', 5000);
                    break;
            }
        }

        // Sorting by status
        if ($request->filled('sortByStatus')) {
            $query->where('status', $request->sortByStatus);
        }

        // Default sorting if no sorting parameter is set
        if (!$request->has('sortByPrice')) {
            $query->orderBy('price', 'asc');
        }

        // Get paginated products
        $products = $query->paginate(9);

        return inertia('Admin/Product', ['products' => $products]);
    }


    public function addProduct(){
        return inertia('Admin/Product_Features/AddProduct');
    }

    public function viewProduct($product_id){
        // dd($product_id);
        $product = Product::find($product_id);
        return inertia('Admin/Product_Features/ViewProduct',['product' => $product]);
    }

    public function storeProduct(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:1',
            'stocks' => 'required|integer|min:1',
            'status' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($request->hasFile('image')){
            // Store the product image to the laravel storage
            $fields['image'] = Storage::disk('public')->put('products',$fields['image']);
            
            $store = Product::create($fields);

            if($store){
                // Return back to the product add section w/ success message
                return redirect()->route('admin.addProduct')
                ->with('success', $fields['product_name'] . ' has been successfully added to the product table.');
            }else{
                // Return back with error message once failed to store data
                return redirect()->back()
                ->with('Failed to add ' . $fields['product_name'] . ' to the product table.');
            }
        }
    }

    public function updateProduct(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:1',
            'stocks' => 'required|integer|min:0',
        ]);

        $status = null;
        if($fields['stocks'] > 20){
            $status = 'In Stock';
        }else if($fields['stocks'] >= 1 && $fields['stocks'] <= 20){
            $status = 'Low of Stock';
        }else{
            $status = 'Out of Stock';
        }

        $update = Product::where('id',$request->product_id)->update([
            'product_name' => $fields['product_name'],
            'description' => $fields['description'],
            'category' => $fields['category'],
            'price' => $fields['price'],
            'stocks' => $fields['stocks'],
            'status' => $status,
        ]);

        if ($update) {
            return redirect()->route('admin.viewProduct', ['product_id' => $request->product_id])
            ->with('success', 'Product updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Product failed to update.');
        }
    }

    // ---------------------------------------------------------------------------------------

    public function orders(){
        return inertia('Admin/Orders');
    }

    public function salesReport(){
        return inertia('Admin/SalesReport');
    }

    // ---------------------------------------------------------------------------------------

    // Employee Functions
    public function employee(){
        $employees = User::where('role','Manager')
        ->latest()
        ->paginate(9);

        return inertia('Admin/Employee',['employees' => $employees]);
    }

    public function addEmployee(){
        return inertia('Admin/Employee_Features/AddEmployee');
    }

    public function storeEmployeeData(Request $request){
        // dd($request);
        $fields = $request->validate([
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'phone' =>  'required|min:11|max:11|unique:users,phone',
            'address' => 'required|string',
            'role' => 'required|string',
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
            'profile' => 'required|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        $fields['password'] = Hash::make($fields['password']);

        if($request->hasFile('profile')){
            $fields['profile'] = Storage::disk('public')->put('profiles',$fields['profile']);

            $employee = User::create([
                'firstname' => $fields['firstname'],
                'lastname' => $fields['lastname'],
                'phone' => $fields['phone'],
                'address' => $fields['address'],
                'role' => $fields['role'],
                'email' => $fields['email'],
                'password' => $fields['password'],
                'profile' => $fields['profile'],
            ]);

            if($employee){
                return redirect()->route('admin.addEmployee')->with('success', $fields['firstname'] . ' data stored successfully.');
            }else{
                return redirect()->back()->with('error','Failed to store the data.');
            }
        }
    }

    public function viewProfile($employee_id){
        // dd($employee_id);
        $employee_info = User::find($employee_id);
        return inertia('Admin/Employee_Features/ViewProfile',['employee_info' => $employee_info]);
    }

    public function updateUserInfo(Request $request){
        // dd($request);
        
        // Check if the email that submitted are existing or not
        $exist = User::find($request->id);

        if($exist){
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'phone' => 'required|string|max:11',
                'address' => 'required|string',
                'email' => 'required|email',
            ]);
        }else{
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'phone' => 'required|string|max:11',
                'address' => 'required|string',
                'email' => 'required|email|unique:users,email',
            ]);
        }

        $update = User::where('id',$request->id)->update([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'phone' => $fields['phone'],
            'address' => $fields['address'],
            'email' => $fields['email'],
        ]);

        if($update){
            return redirect()->route('admin.viewProfile',['employee_id' => $request->id])->with('success','Profile info updated successfully.');
        }else{
            return redirect()->back()->with('error','Profile info failed to update.');
        }
    }

    public function updatePassword(Request $request){
        // dd($request);
        if($request->new_password === $request->confirm_password){

            // Hash the new password
            $request->new_password = Hash::make($request->new_password);

            $updatePass = User::where('id',$request->id)->update([
                'password' => $request->new_password,
            ]);

            if($updatePass){
                return redirect()->route('admin.viewProfile',['employee_id' => $request->id])->with('success','User password updated successfully.');
            }else{
                return redirect()->back()->with('error','User password failed to update.');
            }
        }
        
    }

    // ---------------------------------------------------------------------------------------

    public function messages(){
        return inertia('Admin/Messages');
    }

    public function logout(Request $request){
        Auth::logout();

         // Invalidate and regenerate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.logout');
    }
}