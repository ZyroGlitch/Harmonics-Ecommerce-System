<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FeedbackController
{
    public function feedback(Request $request){
        // dd($request);
        $fields = $request->validate([
            'product_id' => 'required|integer',
            'stars' => 'required|integer',
            'title' => 'nullable|string',
            'appearance_rating' => 'nullable|string',
            'quality_rating' => 'nullable|string',
            'message' => 'nullable|string',
            'images' => 'nullable|array|max:3',
        ]);

        $user = auth()->user();
        $imagePaths = [];

        if($request->hasFile('images')){
            foreach ($request->file('images') as $image) {
                $path = Storage::disk('public')->put('feedback_images', $image);
                $imagePaths[] = $path;
            }
        }

        $store = Feedback::create([
                'product_id' => $fields['product_id'],
                'user_id' => $user->id,
                'stars' => $fields['stars'],
                'title' => $fields['title'],
                'appearance_rating' => $fields['appearance_rating'],
                'quality_rating' => $fields['quality_rating'],
                'message' => $fields['message'],
                'images' => !empty($imagePaths) ? json_encode($imagePaths) : null,
            ]);

        if($store){
            return redirect()->route('customer.showProduct', ['product_id' => $fields['product_id']])
            ->with('success', 'Feedback submitted successfully.');
        }else{
            return redirect()->back()->with('error', 'Failed to submit feedback.');
        }
    }
}