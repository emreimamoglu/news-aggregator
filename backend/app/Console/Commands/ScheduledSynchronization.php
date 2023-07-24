<?php

namespace App\Console\Commands;

use App\NewsUtils\NewsFetcher;
use Illuminate\Console\Command;

class ScheduledSynchronization extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:synchronize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will synchronize the news from the news providers in daily basis.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $synchronizer = new NewsFetcher();
        $synchronizer->fetchAndStoreNews();
    }
}
