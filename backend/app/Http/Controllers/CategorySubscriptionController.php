<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorySubscriptionRequest;
use App\Http\Requests\UpdateCategorySubscriptionRequest;
use App\Models\CategorySubscription;
use App\Traits\HttpResponses;

class CategorySubscriptionController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(CategorySubscription::all()->where('user_id', auth()->user()->id));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorySubscriptionRequest $request)
    {
        \Log::info('User subscribing to category: ' . $request->category_id . ' for user: ' . $request->user_id);
        $request->validated($request->all());
        $categorySubscription = CategorySubscription::create($request->all());
        return $this->success($categorySubscription, 'Successfully subscribed to category');
    }

    /**
     * Display the specified resource.
     */
    public function show(CategorySubscription $categorySubscription)
    {
        return $this->success($categorySubscription);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorySubscriptionRequest $request, CategorySubscription $categorySubscription)
    {
        throw new \Exception('Not implemented');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategorySubscription $categorySubscription)
    {
        \Log::info('User unsubscribing from category: ' . $categorySubscription->id . ' for user: ' . $categorySubscription->user_id);
        $categorySubscription->delete();
        return $this->success(null, 'Successfully unsubscribed from category');
    }
}