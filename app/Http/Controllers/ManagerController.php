<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\WalkInCheckoutDetail;
use App\Models\WalkinCheckoutRecord;
use App\Models\WalkInOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManagerController
{
    public function dashboard(){
        $products = Product::orderByRaw(
            "FIELD(status, 'In stock', 'Low Stock', 'Out of Stock')")
            ->latest()
            ->get();

        $carts = WalkInOrder::with('product')
        ->latest()
        ->paginate(3);

        $subtotal = WalkInOrder::sum('subtotal');
        
        return inertia('Manager/OnsiteOrder',[
            'products' => $products,
            'carts' => $carts,
            'subtotal' => $subtotal,
        ]);
    }

    public function enlist_product(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_id' => 'required',
            'quantity' => 'required|integer'
        ]);

        $product = Product::find($fields['product_id']);
        $price = $product->price;

        $store = WalkInOrder::create([
            'product_id' => $fields['product_id'],
            'quantity' => $fields['quantity'],
            'subtotal' => $fields['quantity'] * $price,
        ]);

        if ($store) {
            return redirect()->route('manager.dashboard')
            ->with('success', 'Walk-in customer order stored successfully.');
        } else {
            return redirect()->back()
            ->with('error', 'Failed to store walk-in customer order.');
        }
    }

    public function cart(){
        $carts = WalkInOrder::with(['product'])
        ->latest()
        ->paginate(5);

        $total = WalkInOrder::sum('subtotal');
        
        if($carts && $total >= 0){
            return inertia('Manager/Cart',[
                'carts' => $carts,
                'total' => $total,
            ]);
        }
    }

    public function checkout(Request $request){
        // dd($request);
        $fields = $request->validate([
            'total' => 'required|numeric',
            'cash_received' => 'required|numeric',
            'customer_name' => 'required|string',
        ]);

        $totalQuantity = WalkInOrder::sum('quantity');

        $newRecord = WalkinCheckoutRecord::create([
            'customer_name' => $fields['customer_name'],
            'quantity' => $totalQuantity,
            'total' => $fields['total'],
            'cash_received' => $fields['cash_received'],
            'change' => $fields['total'] - $fields['cash_received'],
        ]);

        if($newRecord){
            foreach($request->cart_id as $cart){
                $product = WalkInOrder::where('id',$cart)
                ->first();
                
                $newRecordDetails = WalkInCheckoutDetail::create([
                    'product_id' => $product->product_id,
                    'quantity' => $product->quantity,
                    'subtotal' => $product->subtotal,
                ]);

                if($newRecordDetails){
                    return redirect()->route('manager.cart')->with('success','Your order completed.');
                }else{
                    return redirect()->back()->with('error','Failed to store your order!');
                }
            }
        }
    }

    public function product(){
        $products = Product::paginate(10);

        return inertia('Manager/Product',['products' => $products]);
    }

    public function orders(){
        return inertia('Manager/Orders');
    }

    public function addProduct(){
        return inertia('Manager/Product_Features/AddProduct');
    }

    public function profile(){
        return inertia('Manager/Profile');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidate and regenerate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('guest.login');
    }
}