<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class MetaAuthController extends Controller
{
    use HttpResponses;

    function redirectToMeta()
    {
        $clientId = getenv('META_CLIENT_ID');
        $url = "https://www.facebook.com/v18.0/dialog/oauth?client_id={$clientId}&redirect_uri=http://localhost:5173/auth/meta&state=state&scope=email";
        
        \Log::info('User redirecting to Meta for authentication');
        return $this->success([
            'url' => $url
        ], null, 200);
    }

    function handleMetaCallback()
    {
        $clientId = getenv('META_CLIENT_ID');
        $clientSecret = getenv('META_CLIENT_SECRET');
        $code = request()->code;
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', "https://graph.facebook.com/v18.0/oauth/access_token?client_id={$clientId}&redirect_uri=http://localhost:5173/auth/meta&client_secret={$clientSecret}&code={$code}");
        $token = json_decode($response->getBody()->getContents())->access_token;

        $data = $client->get('https://graph.facebook.com/v18.0/me', [
            'headers' => [
                'Accept' => 'application/json',
            ],
            'query' => [
                'fields' => 'id,name,email,picture',
                'access_token' => $token,
            ]
        ]);
        \Log::info('User authenticated with Meta: ' . json_decode($data->getBody()->getContents())->email);
        return $this->success([
            'token' => $token,
            'user' => json_decode($data->getBody()->getContents()),
        ], null, 200);
    }
}
