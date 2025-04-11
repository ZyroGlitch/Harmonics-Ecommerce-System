<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController
{
    public function addToCart(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer'
        ]);

        // Get the authenticated user id
        $user = auth()->user();

        // Fetch the product price
        $product = Product::find($fields['product_id']);

        // Check if the product you want to cart are already listed on the cart
        $existProduct = Cart::where('product_id',$fields['product_id'])->first();

        if(!$existProduct){
            // If not exist yet
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $fields['product_id'],
                'quantity' => $fields['quantity'],
                'subtotal' => $product->price * $fields['quantity'],
            ]);

        }else{
            // It already listed just update the quantity & subtotal
            $existProduct->quantity = $existProduct->quantity + $fields['quantity'];
            $existProduct->subtotal = $product->price * $existProduct->quantity;
            $existProduct->save();
        }

        return redirect()->route('customer.showProduct', ['product_id' => $fields['product_id']])
        ->with('success', 'Product added to cart successfully.');
    }

    public function buyProduct($product_id,$quantity){
        $product = Product::find($product_id);

        return inertia('Customer/Product_Features/BuyProduct',[
            'product' => $product,
            'quantity' => $quantity,
        ]);
    }

    public function cart(){
        $user = auth()->user(); // Get the authenticated user
        
        $carts = Cart::with(['user','product'])
        ->where('user_id',$user->id)
        ->latest()
        ->paginate(5);

        $total = Cart::where('user_id', $user->id)
        ->sum('subtotal');
        
        if($carts && $total >= 0){
            return inertia('Customer/Cart',[
                'carts' => $carts,
                'total' => $total,
            ]);
        }
    }

    public function cart_delete($cart_id){
        // dd($cart_id);
        $user = auth()->user();
         // Ensure $cart_id is an array
        if (!is_array($cart_id)) {
            $cart_id = explode(',', $cart_id); // Convert string to array if needed
        }

        $deleted = Cart::whereIn('id', $cart_id)
        ->where('user_id',$user->id)
        ->delete();

        if ($deleted) {
            return redirect()->route('customer.cart')->with('success', 'Selected items deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'No items were deleted.');
        }
    }

    public function remove_cart($cart_id){
        // dd($cart_id);
        $user = auth()->user();

        $deleted = Cart::where('id', $cart_id)
        ->where('user_id',$user->id)
        ->delete();

        if ($deleted) {
            return redirect()->route('customer.cart')->with('success', 'Selected items deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'No items were deleted.');
        }
    }
}