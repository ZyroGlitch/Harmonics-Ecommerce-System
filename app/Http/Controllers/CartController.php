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

        $addToCart = Cart::create([
            'user_id' => $user->id,
            'product_id' => $fields['product_id'],
            'quantity' => $fields['quantity'],
            'subtotal' => $product->price * $fields['quantity'],
        ]);

        if ($addToCart) {
            return redirect()->route('customer.showProduct', ['product_id' => $fields['product_id']])
            ->with('success', 'Product added to cart successfully.');
        } else {
            return redirect()->back()
            ->with('error', 'Failed to add product to cart.');
        }
    }

    public function buyProduct($product_id,$quantity){
        $product = Product::find($product_id);

        return inertia('Customer/Product_Features/BuyProduct',[
            'product' => $product,
            'quantity' => $quantity,
        ]);
    }
}