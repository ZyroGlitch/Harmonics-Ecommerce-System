<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class AdminController
{
    // ---------------------------------------------------------------------------------------

    // Product Functions
    public function product(Request $request)
    {
        $query = Product::select('id', 'product_name', 'description', 'category', 'price', 'stocks', 'status', 'image');

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


    public function addProduct()
    {
        return inertia('Admin/Product_Features/AddProduct');
    }

    public function viewProduct($product_id)
    {
        // dd($product_id);
        $product = Product::find($product_id);
        return inertia('Admin/Product_Features/ViewProduct', ['product' => $product]);
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
                return redirect()->route('admin.addProduct')
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
            return redirect()->route('admin.viewProduct', ['product_id' => $request->product_id])
                ->with('success', 'Product updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Product failed to update.');
        }
    }

    // ---------------------------------------------------------------------------------------

    public function orders()
    {
        $orders = Order::latest()->paginate(10);

        $order_generatedID = OrderDetail::select('order_id') // Select only the order_id
            ->distinct() // Ensure only unique order_ids are fetched
            ->latest()
            ->get();

        return inertia('Admin/Orders', [
            'orders' => $orders,
            'order_id' => $order_generatedID,
        ]);
    }

    public function salesReport(Request $request)
    {
        $sales = Order::with('user')
            ->where('order_status', 'Completed')
            ->latest()
            ->paginate(10);

        // Eager load the order relation (if exists) and filter by that
        $salesID = OrderDetail::select('order_id')
            ->whereIn('order_id', function ($query) {
                $query->select('id')
                    ->from('orders')
                    ->where('order_status', 'Completed');
            })
            ->distinct()
            ->latest()
            ->get();

        // Total Sales
        $query_totalSales = Order::where('order_status', 'Completed');

        // Total Orders
        $query_totalOrders = Order::where('order_status', 'Completed');

        // Total Customers
        $totalCustomers = User::where('role', 'Customer')->count('id');


        $currentDate = Carbon::now('Asia/Manila'); // current date and time
        if ($request->filled('sortByDate')) {
            $query_totalSales->whereDate('created_at', $request->sortByDate);
        }
        $totalSales = $query_totalSales->sum('total');


        if ($request->filled('sortByMonth')) {
            switch ($request->sortByMonth) {
                case 'Today':
                    $query_totalOrders->whereDate('created_at', $currentDate->toDateString());
                    break;

                case 'Weekly':
                    $startOfWeek = $currentDate->copy()->startOfWeek(); // e.g., Monday
                    $endOfWeek = $currentDate->copy()->endOfWeek();     // e.g., Sunday
                    $query_totalOrders->whereBetween('created_at', [$startOfWeek, $endOfWeek]);
                    break;

                case 'Monthly':
                    $startOfMonth = $currentDate->copy()->startOfMonth();
                    $endOfMonth = $currentDate->copy()->endOfMonth();
                    $query_totalOrders->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
                    break;
            }
        } else {
            $startOfMonth = $currentDate->copy()->startOfMonth();
            $endOfMonth = $currentDate->copy()->endOfMonth();
            $query_totalOrders->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
        }
        $totalOrders = $query_totalOrders->count('id');



        // This functions is for chart analysis
        $startOfMonth = $currentDate->copy()->startOfMonth();
        $endOfMonth = $currentDate->copy()->endOfMonth();

        $dailySales = OrderDetail::select('product_id', DB::raw('SUM(total) as total_sales'))
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->whereIn('order_id', function ($query) {
                $query->select('id')
                    ->from('orders')
                    ->where('order_status', 'Completed');
            })
            ->groupBy('product_id')
            ->with('product')
            ->orderByDesc('total_sales')
            ->get();

        $topSellingProduct = OrderDetail::select('product_id', DB::raw('SUM(quantity) as total_quantity'))
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->whereIn('order_id', function ($query) {
                $query->select('id')
                    ->from('orders')
                    ->where('order_status', 'Completed');
            })
            ->groupBy('product_id')
            ->with('product')
            ->orderByDesc('total_quantity')
            ->get();

        // This is for order status pie chart analysis
        $orderStatusChart = Order::select('order_status', DB::raw('COUNT(*) as total'))
            ->groupBy('order_status')
            ->get();

        $totalCountOrders = Order::count();

        // This is for payment pie chart analysis
        $mostSelectedPayment = Order::select('payment_method', DB::raw('COUNT(*) as total'))
            ->groupBy('payment_method')
            ->get();

        $totalPaymentMethod = Order::count();

        return inertia('Admin/SalesReport', [
            'sales' => $sales,
            'salesID' => $salesID,
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'totalCustomers' => $totalCustomers,
            'dailySales' => $dailySales,
            'topSellingProduct' => $topSellingProduct,
            'orderStatusChart' => $orderStatusChart,
            'totalCountOrders' => $totalCountOrders,
            'mostSelectedPayment' => $mostSelectedPayment,
            'totalPaymentMethod' => $totalPaymentMethod,
        ]);
    }

    public function salesInvoice()
    {
        $sales = Order::with('user')
            ->where('order_status', 'Completed')
            ->latest()
            ->paginate(10);

        // Eager load the order relation (if exists) and filter by that
        $salesID = OrderDetail::select('order_id')
            ->whereIn('order_id', function ($query) {
                $query->select('id')
                    ->from('orders')
                    ->where('order_status', 'Completed');
            })
            ->distinct()
            ->latest()
            ->get();

        // Total Sales
        $totalSales = Order::where('order_status', 'Completed')->sum('total');

        // Total Orders
        $totalOrders = Order::where('order_status', 'Completed')->count('id');

        return inertia('Admin/SalesInvoice', [
            'sales' => $sales,
            'salesID' => $salesID,
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
        ]);
    }

    // ---------------------------------------------------------------------------------------

    // Employee Functions
    public function employee()
    {
        $employees = User::where('role', 'Manager')
            ->latest()
            ->paginate(9);

        return inertia('Admin/Employee', ['employees' => $employees]);
    }

    public function addEmployee()
    {
        return inertia('Admin/Employee_Features/AddEmployee');
    }

    public function storeEmployeeData(Request $request)
    {
        // dd($request);
        $fields = $request->validate([
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'phone' => 'required|min:11|max:11|unique:users,phone',
            'address' => 'required|string',
            'role' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'profile' => 'required|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        $fields['password'] = Hash::make($fields['password']);

        if ($request->hasFile('profile')) {
            $fields['profile'] = Storage::disk('public')->put('profiles', $fields['profile']);

            $employee = User::create([
                'firstname' => $fields['firstname'],
                'lastname' => $fields['lastname'],
                'phone' => $fields['phone'],
                'address' => $fields['address'],
                'role' => $fields['role'],
                'email' => $fields['email'],
                'password' => $fields['password'],
                'profile' => $fields['profile'],
            ]);

            if ($employee) {
                return redirect()->route('admin.addEmployee')->with('success', $fields['firstname'] . ' data stored successfully.');
            } else {
                return redirect()->back()->with('error', 'Failed to store the data.');
            }
        }
    }

    // ---------------------------------------------------------------------------------------

    public function customer()
    {
        $customers = User::where('role','Customer')
        ->latest()
        ->paginate(10);
        
        return inertia('Admin/Customer',['customers' => $customers]);
    }

    // ---------------------------------------------------------------------------------------

    public function viewProfile($employee_id)
    {
        // dd($employee_id);
        $employee_info = User::find($employee_id);
        return inertia('Admin/Employee_Features/ViewProfile', ['employee_info' => $employee_info]);
    }

    public function updateUserInfo(Request $request)
    {
        // dd($request);

        // Check if the email that submitted are existing or not
        $exist = User::find($request->id);

        if ($exist) {
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'phone' => 'required|string|max:11',
                'address' => 'required|string',
                'email' => 'required|email',
            ]);
        } else {
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'phone' => 'required|string|max:11',
                'address' => 'required|string',
                'email' => 'required|email|unique:users,email',
            ]);
        }

        $update = User::where('id', $request->id)->update([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'phone' => $fields['phone'],
            'address' => $fields['address'],
            'email' => $fields['email'],
        ]);

        if ($update) {
            return redirect()->route('admin.viewProfile', ['employee_id' => $request->id])->with('success', 'Profile info updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Profile info failed to update.');
        }
    }

    public function updatePassword(Request $request)
    {
        // dd($request);
        if ($request->new_password === $request->confirm_password) {

            // Hash the new password
            $request->new_password = Hash::make($request->new_password);

            $updatePass = User::where('id', $request->id)->update([
                'password' => $request->new_password,
            ]);

            if ($updatePass) {
                return redirect()->route('admin.viewProfile', ['employee_id' => $request->id])->with('success', 'User password updated successfully.');
            } else {
                return redirect()->back()->with('error', 'User password failed to update.');
            }
        }

    }

    // ---------------------------------------------------------------------------------------

    public function profile()
    {
        $user = auth()->user();
        $admin = User::find($user->id);

        return inertia('Admin/Profile', ['admin' => $admin]);
    }

    public function updateAdminInfo(Request $request)
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
            return redirect()->route('admin.profile')
                ->with('success', 'All your information has been updated successfully.');
        } else {
            return redirect()->back()
                ->with('error', 'Your information update was unsuccessful.');
        }
    }

    public function updateAdminProfile(Request $request)
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
                return redirect()->route('admin.profile')
                    ->with('success', 'Your profile image has been updated successfully.');
            } else {
                return redirect()->back()->with('error', 'Your profile image update has failed.');
            }
        }
    }

    public function updateAdminPassword(Request $request)
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
                return redirect()->route('admin.profile')
                    ->with('success', 'Password update successfully.');
            } else {
                return redirect()->back() - with('error', 'Updating password failed.');
            }
        }
    }

    // ---------------------------------------------------------------------------------------

    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidate and regenerate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('guest.login');
    }
}