<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\WalkInOrder;
use Illuminate\Http\Request;
use App\Models\WalkInCheckoutDetail;
use App\Models\WalkinCheckoutRecord;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

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

        $product_exist = WalkInOrder::with('product')
        ->where('product_id',$fields['product_id'])
        ->first();

        // dd($product_exist);

        if($product_exist){
            $product_exist->quantity += $fields['quantity'];
            $product_exist->subtotal += $product_exist->product->price * $fields['quantity'];
            $product_exist->save();

            return redirect()->route('manager.dashboard')
            ->with('success', 'The product was successfully added to the cart.');
        }

        $product = Product::find($fields['product_id']);

        $user = auth()->user();

        $store = WalkInOrder::create([
            'user_id' => $user->id,
            'product_id' => $fields['product_id'],
            'quantity' => $fields['quantity'],
            'subtotal' => $fields['quantity'] * $product->price,
        ]);

        if ($store) {
            return redirect()->route('manager.dashboard')
            ->with('success', 'The product was successfully added to the cart.');
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

    public function removeItem($cart_id){
        // dd($cart_id);
        $remove = WalkInOrder::where('id',$cart_id)->delete();

        if($remove){
            return redirect()->back();
        }else{
            return redirect()->back()->with('error','Product failed to remove!');
        }
    }

    public function checkout(Request $request){
        // dd($request);
        $fields = $request->validate([
            'total' => 'required|numeric',
            'cash_received' => 'required|numeric|min:1',
            'customer_name' => 'required|string',
        ]);

        $totalQuantity = WalkInOrder::sum('quantity');

        $user = auth()->user();

        // Store the walk-in order record
        $newRecord = WalkinCheckoutRecord::create([
            'user_id' => $user->id,
            'customer_name' => $fields['customer_name'],
            'quantity' => $totalQuantity,
            'total' => (float) $fields['total'],
            'cash_received' => (float) $fields['cash_received'],
            'change' => $fields['cash_received'] - $fields['total'],
        ]);

        if($newRecord){
            foreach($request->cart_id as $cart){
                $product = WalkInOrder::where('id',$cart)
                ->first();
                
                // Store the checkout details
                WalkInCheckoutDetail::create([
                    'checkout_rec_id' => $newRecord->id,
                    'product_id' => $product->product_id,
                    'quantity' => $product->quantity,
                    'subtotal' => $product->subtotal,
                ]);

                // Remove from the walk-in cart orders
                WalkInOrder::where('id',$cart)->delete();
            }

            return redirect()->route('manager.cart')
            ->with('success','Checkout completed successfully.');
        }
    }

    // -------------------------------------------------------------------------
    // Product Functions
    public function product(Request $request)
    {
        $query = Product::select('id', 'product_name', 'description', 'category', 'price', 'stocks', 'status', 'image');

        // Search by product name
        if ($request->filled('searchByName')) {
            $query->where('product_name', 'like', '%' . $request->searchByName . '%');
        }

        // Sorting by status (default order: In Stock → Low Stock → Out of Stock)
        if (!$request->filled('sortByStatus') || $request->sortByStatus === 'All') {
            $query->orderByRaw("
                CASE status
                    WHEN 'In Stock' THEN 1
                    WHEN 'Low Stock' THEN 2
                    WHEN 'Out of Stock' THEN 3
                    ELSE 4
                END
            ");
        } else {
            $query->where('status', $request->sortByStatus);
        }

        // Get paginated products
        $products = $query->latest()->paginate(9);

        return inertia('Manager/Product', ['products' => $products]);
    }

    public function viewProduct($product_id)
    {
        // dd($product_id);
        $product = Product::find($product_id);
        return inertia('Manager/Product_Features/ViewProduct', ['product' => $product]);
    }

    public function addProduct(){
        return inertia('Manager/Product_Features/AddProduct');
    }

    public function storeProduct(Request $request)
    {
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

        if ($request->hasFile('image')) {
            // Store the product image to the laravel storage
            $fields['image'] = Storage::disk('public')->put('products', $fields['image']);

            $store = Product::create($fields);

            if ($store) {
                // Return back to the product add section w/ success message
                return redirect()->route('manager.addProduct')
                    ->with('success', $fields['product_name'] . ' has been successfully added to the product table.');
            } else {
                // Return back with error message once failed to store data
                return redirect()->back()
                    ->with('Failed to add ' . $fields['product_name'] . ' to the product table.');
            }
        }
    }

    public function updateProduct(Request $request)
    {
        // dd($request);
        $fields = $request->validate([
            'product_name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:1',
            'stocks' => 'required|integer|min:0',
        ]);

        $status = null;
        if ($fields['stocks'] > 20) {
            $status = 'In Stock';
        } else if ($fields['stocks'] >= 1 && $fields['stocks'] <= 20) {
            $status = 'Low of Stock';
        } else {
            $status = 'Out of Stock';
        }

        $update = Product::where('id', $request->product_id)->update([
            'product_name' => $fields['product_name'],
            'description' => $fields['description'],
            'category' => $fields['category'],
            'price' => $fields['price'],
            'stocks' => $fields['stocks'],
            'status' => $status,
        ]);

        if ($update) {
            return redirect()->route('manager.viewProduct', ['product_id' => $request->product_id])
                ->with('success', 'Product updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Product failed to update.');
        }
    }
    
    // -------------------------------------------------------------------------
    // Order Functions
    public function orders(){
        $user = auth()->user();

        $orders = WalkinCheckoutRecord::where('user_id',$user->id)->latest()
        ->paginate(10);

        return inertia('Manager/Orders',['orders' => $orders]);
    }

    public function view_walkInOrders($order_id){
        // dd($order_id);
        $order_details = WalkInCheckoutDetail::where('checkout_rec_id',$order_id)
        ->with(['checkout_orders','products'])
        ->latest()
        ->paginate(9);

        $totalItems = WalkInCheckoutDetail::sum('quantity');
        $totalAmount = WalkInCheckoutDetail::sum('subtotal');

        return inertia('Manager/Order_Features/ViewOrders',[
            'order_details' => $order_details,
            'totalItems' => $totalItems,
            'totalAmount' => $totalAmount,
        ]);
    }

    public function invoice($order_id){
        // dd($order_id);
        $order_details = WalkInCheckoutDetail::with(['checkout_orders','products'])
        ->where('checkout_rec_id',$order_id)
        ->latest()
        ->get();

        $total = WalkInCheckoutDetail::sum('subtotal');

        return inertia('Manager/InvoiceReceipt',[
            'order_details' => $order_details,
            'total' => $total
        ]);
    }
    // -------------------------------------------------------------------------

    // Profile Functions
    public function profile()
    {
        $user = auth()->user();
        $manager = User::find($user->id);

        return inertia('Manager/Profile', ['manager' => $manager]);
    }

    public function updateManagerInfo(Request $request)
    {
        $user = auth()->user();
        $authenticatedEmailExist = User::where('email', $request->email)
            ->where('id', $user->id)
            ->first();

        if ($authenticatedEmailExist) {
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'phone' => 'required|string',
                'address' => 'required|string',
                'email' => 'required|email',
            ]);
        } else {
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'phone' => 'required|string',
                'address' => 'required|string',
                'email' => 'required|email|unique:users,email',
            ]);
        }

        $updateInfo = User::where('id', $user->id)->update([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'phone' => $fields['phone'],
            'address' => $fields['address'],
            'email' => $fields['email'],
        ]);

        if ($updateInfo) {
            return redirect()->route('manager.profile')
                ->with('success', 'All your information has been updated successfully.');
        } else {
            return redirect()->back()
                ->with('error', 'Your information update was unsuccessful.');
        }
    }

    public function updateManagerProfile(Request $request)
    {
        $request->validate([
            'profile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = auth()->user();

        if ($request->hasFile('profile')) {
            $fields['profile'] = Storage::disk('public')->put('profiles', $request->profile);

            // Update the null profile of the user
            $profile = User::where('id', $user->id)->update([
                'profile' => $fields['profile'],
            ]);

            if ($profile) {
                return redirect()->route('manager.profile')
                    ->with('success', 'Your profile image has been updated successfully.');
            } else {
                return redirect()->back()->with('error', 'Your profile image update has failed.');
            }
        }
    }

    public function updateManagerPassword(Request $request)
    {
        $fields = $request->validate([
            'new_password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'confirm_password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        if ($fields['new_password'] === $fields['confirm_password']) {
            $fields['new_password'] = Hash::make($fields['new_password']);

            $user = auth()->user(); // Get the authenticated user

            $updatePassword = User::where('id', $user->id)->update([
                'password' => $fields['new_password'],
            ]);

            if ($updatePassword) {
                return redirect()->route('manager.profile')
                    ->with('success', 'Password update successfully.');
            } else {
                return redirect()->back() - with('error', 'Updating password failed.');
            }
        }else{
            return redirect()->back()->with('error', 'The new password and confirm password do not match.');
        }
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