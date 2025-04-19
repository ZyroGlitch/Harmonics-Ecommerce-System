<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OrderController
{
    public function directProductOrder(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
            'total' => 'required|numeric',
            'payment_method' => 'required|string',
            'receipt_reference' => 'required|string',
            'payment_receipt' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($request->hasFile('payment_receipt')){
            $fields['payment_receipt'] = Storage::disk('public')->put('payment_receipt',$fields['payment_receipt']); 

             // Generate a string value of order ID
            $generated_id = strtoupper(Str::random(12));

            $user = auth()->user();
            
            $order = Order::create([
                'id' => $generated_id,
                'user_id' => $user->id,
                'quantity' => $fields['quantity'],
                'total' => $fields['total'],
                'payment_method' => $fields['payment_method'],
                'receipt_reference' => $fields['receipt_reference'],
                'payment_receipt' => $fields['payment_receipt'],
            ]);

            $orderDetails = OrderDetail::create([
                'order_id' => $generated_id,
                'product_id' => $fields['product_id'],
                'user_id' => $user->id,
                'quantity' => $fields['quantity'],
                'total' => $fields['total'],
            ]);

            if ($order && $orderDetails) {
                return redirect()->route('customer.buyProduct', [
                    'product_id' => $fields['product_id'],
                    'quantity' => $fields['quantity'],
                ])->with('success', 'Your order was stored successfully.');
            } else {
                return redirect()->back()
                ->with('error', 'Order failed to be stored.');
            }
        }else{
            dd('No Image Upload!');
        }
    }

    public function orders(){
        $user = auth()->user();

        $orders = Order::where('user_id',$user->id)
        ->latest()
        ->paginate(10);

        $order_generatedID = OrderDetail::where('user_id', $user->id)
        ->select('order_id') // Select only the order_id
        ->distinct() // Ensure only unique order_ids are fetched
        ->latest()
        ->get();

        return inertia('Customer/Orders',[
            'orders' => $orders,
            'order_id' => $order_generatedID,
        ]);
    }
}