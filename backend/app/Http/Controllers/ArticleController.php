<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $searchTerm = $request->input('search');

        $query = Article::orderBy('published_at', 'desc');

        if ($searchTerm) {
            $query->where('title', 'LIKE', '%' . $searchTerm . '%');
        }

        $articles = $query->paginate(3, ['*'], 'page', $page);

        return $this->success($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $request->validated($request->all());
        $article = Article::create($request->all());
        return $this->success($article, 'Article created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return $this->success($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $request->validated($request->all());
        $article->update($request->all());
        return $this->success($article, 'Article updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return $this->success(null, 'Article deleted successfully');
    }

    /**
     * Returns a custom feed for the authenticated user.
     */

    public function customFeed(Request $request)
    {
        $user = $request->user();
        $page = $request->input('page', 1);
        $searchTerm = $request->input('search');
    
        $articlesByCategory = Article::join('category_subscriptions', 'articles.category_id', '=', 'category_subscriptions.category_id')
            ->where('category_subscriptions.user_id', $user->id)
            ->orderBy('published_at', 'desc');
    
        $articlesBySource = Article::join('source_subscriptions', 'articles.source_id', '=', 'source_subscriptions.source_id')
            ->where('source_subscriptions.user_id', $user->id)
            ->orderBy('published_at', 'desc');
    
        $merged = $articlesByCategory->union($articlesBySource);
    
        if ($searchTerm) {
            $merged->where('title', 'LIKE', '%' . $searchTerm . '%');
        }
    
        $articles = $merged->paginate(3, ['*'], 'page', $page);
    
        return $this->success($articles);
    }
}