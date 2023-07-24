<?php

namespace App\NewsUtils;

interface INewsProvider {
    public function fetchNews(string $from): array;
}