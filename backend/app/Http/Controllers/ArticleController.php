<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $categoryIds = $request->input('category_ids');
        $sourceIds = $request->input('source_ids');
        $page_size = $request->input('page_size', 10);

        $query = Article::join('sources', 'articles.source_id', '=', 'sources.id')
        ->orderBy('published_at', 'desc')
        ->select('articles.*', 'sources.name as source_name');

        if ($searchTerm) {
            $query->where('title', 'LIKE', '%' . $searchTerm . '%');
        }

        if ($categoryIds) {
            $categoryIdsArray = explode(',', $categoryIds);
            $query->whereIn('category_id', $categoryIdsArray);
        }
    
        if ($sourceIds) {
            $sourceIdsArray = explode(',', $sourceIds);
            $query->whereIn('source_id', $sourceIdsArray);
        }

        $articles = $query->paginate($page_size, ['*'], 'page', $page);

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
        $page_size = $request->input('page_size', 10);
    
        $articlesByCategory = Article::join('category_subscriptions', 'articles.category_id', '=', 'category_subscriptions.category_id')
            ->where('category_subscriptions.user_id', $user->id)
            ->orderBy('published_at', 'desc')
            ->select('articles.*', DB::raw('null as source_name'));
    
        $articlesBySource = Article::join('source_subscriptions', 'articles.source_id', '=', 'source_subscriptions.source_id')
            ->join('sources', 'articles.source_id', '=', 'sources.id')
            ->where('source_subscriptions.user_id', $user->id)
            ->orderBy('published_at', 'desc')
            ->select('articles.*', 'sources.name as source_name');
    
        $merged = $articlesByCategory->union($articlesBySource);
    
        if ($searchTerm) {
            $merged->where('title', 'LIKE', '%' . $searchTerm . '%');
        }
    
        $articles = $merged->paginate($page_size, ['*'], 'page', $page);
    
        return $this->success($articles);
    }
}