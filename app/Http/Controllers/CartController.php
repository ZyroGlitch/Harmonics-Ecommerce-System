<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

    public function checkout(Request $request){
        // dd($request);
        $fields = $request->validate([
            'cart_id' => 'required|array',
            'total' => 'required|numeric',
            'payment_method' => 'required|string',
            'receipt_reference' => 'required|string',
            'payment_receipt' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Generate a string value of order ID
        $generated_id = strtoupper(Str::random(12));

        $user = auth()->user(); // Get authenticated user

        if($request->hasFile('payment_receipt')){
            $request->payment_receipt = Storage::disk('public')->put('payment_receipt',$request->payment_receipt);

            $store_order = Order::create([
                'id' => $generated_id,
                'user_id' => $user->id,
                'quantity' => 0,
                'total' => $fields['total'],
                'payment_method' => $fields['payment_method'],
                'receipt_reference' => $fields['receipt_reference'],
                'payment_receipt' => $request->payment_receipt,
            ]);

            if($store_order){
                // Declare a summation variables
                $quantity = 0;
                $subtotal = 0.00;

                foreach($fields['cart_id'] as $cart_id){
                    $cart = Cart::where('id',$cart_id)->first();

                    // Sum the total quantity and subtotal
                    $quantity += $cart->quantity;
                    $subtotal += $cart->subtotal;

                    OrderDetail::create([
                        'order_id' => $generated_id,
                        'product_id' => $cart->product_id,
                        'user_id' => $user->id,
                        'quantity' => $cart->quantity,
                        'total' => $cart->subtotal,
                    ]);
                }

                // Update the Order with correct quantity after inserting order details
                $updateOrder = Order::where('id',$generated_id)
                ->update([
                    'quantity' => $quantity,
                ]);

                if($updateOrder){
                    // Clear all the products on the cart after successful checkout
                    Cart::where('user_id',$user->id)->delete();
                    
                    return redirect()->route('customer.invoice',['order_id' => $generated_id]);
                }else{
                    return redirect()->back()->with('error',"Failed to checkout your orders.");
                }
            }
            
        }else{
            return redirect()->back()
            ->with('error', "Please provide payment receipt."); 
        }
    }

    public function invoice($order_id){
        // dd($order_id);
        $order = Order::find($order_id);

        $orderDetails = OrderDetail::with(['product','user'])
        ->where('order_id',$order_id)
        ->get();

        return inertia('Customer/InvoiceReceipt',[
            'order' => $order,
            'orderDetails' => $orderDetails,
        ]);
    }
}