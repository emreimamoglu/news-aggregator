<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSavedArticleRequest;
use App\Http\Requests\UpdateSavedArticleRequest;
use App\Models\SavedArticle;
use App\Traits\HttpResponses;

class SavedArticleController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(SavedArticle::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSavedArticleRequest $request)
    {
        $request->validated($request->all());
        $savedArticle = SavedArticle::create($request->all());
        return $this->success($savedArticle, 'Article saved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(SavedArticle $savedArticle)
    {
        return $this->success($savedArticle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SavedArticle $savedArticle)
    {
        $savedArticle->delete();
        return $this->success(null, 'Article deleted successfully');
    }
}
