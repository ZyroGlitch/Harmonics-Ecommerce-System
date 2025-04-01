<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Str;

class CartController extends Controller
{
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
    
    public function checkout(Request $request){
        // dd($request);
        $fields = $request->validate([
            'cart_id' => 'required|array',
            'total' => 'required',
            'cash_received' => 'required',
        ]);

        // Generate a string value of order ID
        $generated_id = strtoupper(Str::random(12));

        $user = auth()->user(); // Get authenticated user

        if($fields['cash_received'] < $fields['total']){
            // dd('Less amount');
            return redirect()->route('customer.cart')
            ->with('error', "Insufficient payment. Please provide enough.");
        }else{
            // dd('Exact amount');
            $store_order = Order::create([
                'id' => $generated_id,
                'user_id' => $user->id,
                'quantity' => 0,
                'total' => $fields['total'],
                'cash_recieved' => $fields['cash_received'],
                'change' => $fields['cash_received'] - $fields['total'],
            ]);
            
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
    }

    public function invoice($order_id){
        // dd($order_id);
        $order = Order::find($order_id);

        $orderDetails = OrderDetail::with(['product','user'])
        ->where('order_id',$order_id)
        ->get();

        return inertia('InvoiceReceipt',[
            'order' => $order,
            'orderDetails' => $orderDetails,
        ]);
    }

    public function downloadInvoice($order_id){
        // dd('Im In: ' . $order_id);
        $order = Order::find($order_id);

        $orderDetails = OrderDetail::with(['product','user'])
        ->where('order_id',$order_id)
        ->get();

        return inertia('Admin/InvoiceReceipt',[
            'order' => $order,
            'orderDetails' => $orderDetails,
        ]);
    }
}