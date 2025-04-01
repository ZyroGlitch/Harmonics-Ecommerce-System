<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderController extends Controller
{
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