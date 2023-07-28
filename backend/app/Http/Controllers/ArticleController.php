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
}