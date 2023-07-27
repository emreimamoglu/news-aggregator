<?php

namespace App\NewsUtils;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\NewsUtils\INewsProvider;
use Exception;
use GuzzleHttp\Client;

class TheGuardianProvider implements INewsProvider {
    public function fetchNews(string $from): array {

        $apiRoute = getenv('THE_GUARDIAN_API_ROUTE');
        if (!$apiRoute) {
            throw new Exception('The Guardian API route not set.');
        }

        $apiKey = getenv('THE_GUARDIAN_API_KEY');
        if (!$apiKey) {
            throw new Exception('The Guardian API key not set.');
        }

        $url = $apiRoute . '?api-key=' . $apiKey . '&show-blocks=all' . '&from=' . $from . '&sortBy=publishedAt&show-fields=all&page-size=100';

        $client = new Client();
        $response = $client->get($url);


        $newsData = json_decode($response->getBody(), true);

        $normalizedData = [];
        foreach ($newsData['response']['results'] as $item) {

            Source::firstOrCreate([
                'name' => 'The Guardian',
            ]);

            Author::firstOrCreate([
                'name' => $item['author'] ?? 'Unknown',
            ]);

            Category::firstOrCreate([
                'name' => $item['sectionName'] ?? 'General',
            ]);
            
            array_push($normalizedData,[
                'source' => 'The Guardian',
                'title' => $item['webTitle'],
                'description' => $item['fields']['trailText'] ?? '',
                'content' => $item['fields']['bodyText'],
                'category' => $item['sectionName'],
                'published_at' => $item['webPublicationDate'],
                'url' => $item['webUrl'],
                'image_url' => $item['fields']['thumbnail'] ?? '',
                'source_id' => Source::where('name', 'The Guardian')->first()->id,
                'author_id' => Author::where('name', $item['author'] ?? 'Unknown')->first()->id,
                'category_id' => Category::where('name', $item['sectionName'] ?? 'General')->first()->id
            ]);
        }

        return $normalizedData;
    }
}