<?php

namespace App\NewsUtils;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\NewsUtils\INewsProvider;
use Exception;
use GuzzleHttp\Client;

class OpenNewsOrgProvider implements INewsProvider {
    public function fetchNews(string $from): array {

        $apiRoute = getenv('OPEN_NEWS_ORG_API_ROUTE');
        if (!$apiRoute) {
            throw new Exception('Open News Org API route not set.');
        }

        $apiKey = getenv('OPEN_NEWS_ORG_API_KEY');
        if (!$apiKey) {
            throw new Exception('OPEN News Org API key not set.');
        }

        $url = $apiRoute . '?apiKey=' . $apiKey . '&from=' . $from . '&sortBy=publishedAt&pageSize=100&q=all';

        $client = new Client();
        $response = $client->get($url);

        $newsData = json_decode($response->getBody(), true);


        $normalizedData = [];

        foreach ($newsData['articles'] as $item) {
            if(!$item['title'] || !$item['description'] || !$item['urlToImage'])
                continue;
                

            Source::firstOrCreate([
                'name' => $item['source']['name'],
            ]);

            Author::firstOrCreate([
                'name' => $item['author'] ?? 'Unknown',
            ]);

            Category::firstOrCreate([
                'name' => 'General',
            ]);

            array_push($normalizedData,[
                'source' => $item['source']['name'] ?? 'Open News AI',
                'title' => $item['title'],
                'content' => $item['content'],
                'description' => $item['description'],
                'category' => 'General',
                'published_at' => $item['publishedAt'],
                'url' => $item['url'],
                'image_url' => $item['urlToImage'],
                'source_id' => Source::where('name', $item['source']['name'])->first()->id,
                'author_id' => Author::where('name', $item['author'] ?? 'Unknown')->first()->id,
                'category_id' => Category::where('name', 'General')->first()->id
            ]);
        }

        return $normalizedData;
    }
}