<?php

namespace App\NewsUtils;

use App\NewsUtils\INewsProvider;
use Exception;
use GuzzleHttp\Client;

class OpenNewsAiProvider implements INewsProvider {
    public function fetchNews(string $from): array {

        $apiRoute = getenv('OPEN_NEWS_AI_API_ROUTE');
        if (!$apiRoute) {
            throw new Exception('Open News AI API route not set.');
        }

        $apiKey = getenv('OPEN_NEWS_AI_API_KEY');
        if (!$apiKey) {
            throw new Exception('OPEN News AI API key not set.');
        }

        $client = new Client();

        $response = $client->post($apiRoute, [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'json' => [
                "action" => "getArticles",
                "dateStart"  => $from,
                "articlesPage" => 1,
                "articlesCount" => 100,
                "articlesSortBy" => "date",
                "articlesSortByAsc" => false,
                "includeArticleTitle" => true,
                "includeArticleBasicInfo" => true,
                "articlesArticleBodyLen" => -1,
                "resultType" => "articles",
                "dataType" => [
                  "news",
                ],
                "apiKey" => $apiKey,
                "articleBodyLen"  => -1,
                "forceMaxDataTimeWindow" => 31,
                "lang"  => "eng"
            ],
        ]);

        $newsData = json_decode($response->getBody(), true);

        $normalizedData = [];

        foreach ($newsData['articles']['results'] as $item) {

            if(!$item['title'] || !$item['image'])
            continue;

            array_push($normalizedData,[
                'source' => $item['source']['title'] ?? 'Open News AI',
                'title' => $item['title'],
                'content' => $item['body'],
                'description' => $item['description'] ?? '',
                'category' => 'General',
                'published_at' => $item['dateTimePub'],
                'url' => $item['url'],
                'image_url' => $item['image'],
                'source_id' => '1',
                'author_id' => '1',
                'category_id' => '1',
            ]);
        }
        
        return $normalizedData;
    }
}