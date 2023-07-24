<?php

namespace App\NewsUtils;
use App\Models\Article;

class NewsStorage {
    public function storeNews(array $newsData) {

        foreach ($newsData as $article) {
            $articleModel = new Article();
            $articleModel->title = $article['title'];
            $articleModel->description = $article['description'];
            $articleModel->url = $article['url'];
            $articleModel->image_url = $article['image_url'];
            $articleModel->published_at = $article['published_at'];
            $articleModel->content = $article['content'];
            $articleModel->source_id = $article['source_id'];
            $articleModel->author_id = $article['author_id'];
            $articleModel->category_id = $article['category_id'];
            $articleModel->save();
        }
    }
}