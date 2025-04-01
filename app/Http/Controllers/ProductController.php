<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function storeProduct(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_name' => 'required',
            'description' => 'required',
            'price' => 'required|integer',
            'stocks' => 'required|integer',
            'image' => 'required|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        if($request->hasFile('image')){
            $fields['image'] = Storage::disk('public')->put('products',$request->image);

            // Ensure price and stocks are integers
            $fields['price'] = (int) $fields['price'];
            $fields['stocks'] = (int) $fields['stocks'];

            // Store data to Products Table
            $product = Product::create([
                'product_name' => $fields['product_name'],
                'description' => $fields['description'],
                'price' => $fields['price'],
                'stocks' => $fields['stocks'],
                'image' => $fields['image']
            ]);

            if($product){
                return redirect()->route('inventory.addProduct')->with('success', $fields['product_name'] . ' data stored successfully.');
            }else{
                return redirect()->back()->with('error','Failed to store the data.');
            }
        }
    }

    public function showInventoryProduct(){
        $products = Product::latest()->paginate(6);
        return inertia('Admin/Inventory',['products' => $products]);
    }

    public function displayProduct(){
        $products = Product::latest()->paginate(6);
        return inertia('Customer/Product',['products' => $products]);
    }

    public function viewProduct($product_id){
        $products = Product::find($product_id);
        return inertia('Admin/Inventory_Features/ViewProduct',
        ['products' => $products]);
    }

    public function updateProduct(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'stocks' => 'required|integer',
        ]);

        $product = Product::where('id',$request->id)->update([
            'product_name' => $fields['product_name'],
            'description' => $fields['description'],
            'price' => $fields['price'],
            'stocks' => $fields['stocks'],
        ]);

        if($product){
            return redirect()->route('inventory.viewProduct',['product_id' => $request->id])
            ->with('success',$fields['product_name'] . ' product update successfully.');
        }else{
            return redirect()->back()->with('error','Updating product information failed.');
        }
    }

    public function showProduct($product_id){
        // dd($product_id);
        $product = Product::find($product_id);

        if($product){
            return inertia('Customer/Product_Features/ShowProduct',['product' => $product]);
        }
    }

    public function addToCart(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $user = auth()->user(); // Get the authenticated user

        $product = Product::find($request->product_id);

        // Check if the product you want to store is already listed in the cart
        $existingProduct = Cart::where('product_id',$fields['product_id'])
        ->where('user_id',$user->id)->first();

        // dd($existingProduct);

        if($existingProduct){
            $updateCart = Cart::where('id', $existingProduct->id)->update([
            'quantity' => $existingProduct->quantity + $fields['quantity'],
            'subtotal' => $existingProduct->subtotal + ($product->price * $fields['quantity']),
            ]);

            if($updateCart){
                return redirect()->route('customer.showProduct',['product_id' => $fields['product_id']])
                ->with('success',$product->product_name . ' add to cart successfully.');
            }else{
                return redirect()->route('customer.showProduct',['product_id' => $fields['product_id']])
                ->with('error',"Product can't add to cart.");
            }
        }else{
            if($product){
                $addToCart = Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $fields['product_id'],
                    'quantity' => $fields['quantity'],
                    'subtotal' => $product->price * $fields['quantity'],
                ]);

                if($addToCart){
                    return redirect()->route('customer.showProduct',['product_id' => $fields['product_id']])
                    ->with('success',$product->product_name . ' add to cart successfully.');
                }else{
                    return redirect()->route('customer.showProduct',['product_id' => $fields['product_id']])
                    ->with('error',"Product can't add to cart.");
                }
            }
        }
    }
}