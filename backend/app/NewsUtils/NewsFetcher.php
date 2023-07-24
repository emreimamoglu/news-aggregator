<?php

namespace App\NewsUtils;

use App\NewsUtils\TheGuardianProvider;
use App\NewsUtils\NewsStorage;
use App\NewsUtils\OpenNewsOrgProvider;
use Carbon\Carbon;


class NewsFetcher {
    private $providers;
    private $storage;

    public function __construct() {
        $this->providers = array(
            new TheGuardianProvider(),
            new OpenNewsOrgProvider(),
            new OpenNewsAiProvider()
        );
        $this->storage = new NewsStorage();
    }

    public function fetchAndStoreNews() {
        foreach ($this->providers as $provider) {
            $news = $provider->fetchNews(Carbon::now()->subDay()->toDateString());
            $this->storage->storeNews($news);
        }
    }
}
