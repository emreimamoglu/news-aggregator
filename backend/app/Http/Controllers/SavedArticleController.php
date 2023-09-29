<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSavedArticleRequest;
use App\Http\Requests\UpdateSavedArticleRequest;
use App\Models\SavedArticle;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\DB;

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
        \Log::info('User saving article: ' . $request->article_id . ' for user: ' . $request->user_id);

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
        \Log::info('User deleting saved article: ' . $savedArticle->id . ' for user: ' . $savedArticle->user_id);
        
        $savedArticle->delete();
        return $this->success(null, 'Article deleted successfully');
    }

    /**
     * Returns saved articles for the authenticated user.
     */
     
    public function userSavedArticles(){
        $savedArticles = DB::table('saved_articles')
        ->join('articles', 'articles.id', '=', 'saved_articles.article_id')
        ->select('saved_articles.id AS saved_articles_saved_article_id', 'articles.*')
        ->get();

    return $this->success($savedArticles);
    }
}
