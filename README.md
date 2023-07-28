
# News Aggregator

News aggregator is an app for gathering news from different sources and serving it. The main features are as following :

- Register, Login
- Searching and Filtering the news data
- Subscribing to sources(ex: BBC, The Guardian)
- Subscribing to categories

The scheduled task by default works at every midnight to collect the news of the previous day. The frequency can be adjustable.


## Installation

Install News Aggregator:

```bash
cd news-aggregator
docker compose up -d // Will run the containers detached
```

Migrate the db:

```bash
docker exec news-api php artisan migrate
```

Set the env variables for frontend :

```bash
NEWS_APP_URL=http://localhost:8000/api by default
```

Set the env variables for backend :

API keys can be acquired from :
- https://open-platform.theguardian.com/access/
- https://newsapi.org/register
- https://www.newsapi.ai/register

```bash
SPA_URL=<URL WERE UI SERVED>

THE_GUARDIAN_API_KEY=<KEY>
OPEN_NEWS_ORG_API_KEY=<KEY>
OPEN_NEWS_AI_API_KEY=<KEY>

THE_GUARDIAN_API_ROUTE=<GUARDIAN_NEWS_API>
OPEN_NEWS_ORG_API_ROUTE=<OPEN_NEWS_ORG_API>
OPEN_NEWS_AI_API_ROUTE=<OPEN_NEWS_AI_API>

DB_CONNECTION=pgsql
DB_HOST=<HOST>
DB_PORT=5432
DB_DATABASE=<DB>
DB_USERNAME=<USERNAME>
DB_PASSWORD=<PASSWORD>

MAIL_MAILER=smtp
MAIL_HOST=<>
MAIL_PORT=<>
MAIL_USERNAME=<>
MAIL_PASSWORD=<>
MAIL_ENCRYPTION=<>
MAIL_FROM_ADDRESS=<>
MAIL_FROM_NAME=<>
```

Start the scheduler :

```bash
docker exec news-api php artisan news:synchronize
docker exec news-api php artisan schedule:work
```

Start Using UI by going :

```bash
http://localhost:3003
```

Registered fetchers can be found in the constructor of the fetcher :

```bash
backend/app/NewsUtils/NewsFetcher.php

public function __construct() {
        $this->providers = array(
            new TheGuardianProvider(),
            new OpenNewsOrgProvider(),
            new OpenNewsAiProvider()
        );
        $this->storage = new NewsStorage();
    }
```
