<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminController
{
    // ---------------------------------------------------------------------------------------

    // Product Functions
public function product(Request $request) {
    // Debugging: Check incoming request data
    // dd($request->all());

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

    public function customers(){
        return inertia('Admin/Customers');
    }

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