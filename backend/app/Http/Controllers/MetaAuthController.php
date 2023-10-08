<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class MetaAuthController extends Controller
{
    use HttpResponses;

    function redirectToMeta()
    {
        $clientId = getenv('META_CLIENT_ID');
        $url = "https://www.facebook.com/v18.0/dialog/oauth?client_id={$clientId}&redirect_uri=http://localhost:5173/auth/meta&state=statexddx&scope=email";

        \Log::info('User redirecting to Meta for authentication');
        return $this->success([
            'url' => $url
        ], null, 200);
    }

    function handleMetaCallback()
    {
        try {
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

            $contents = $data->getBody()->getContents();
            $decoded = json_decode($contents);

            /** @var User $user */
            $user = User::query()
                ->updateOrCreate(
                    ['email' => $decoded->email],
                    [
                        'name' => $decoded->name,
                        'password' => null,
                        'meta_id' => $decoded->id,
                    ]
                );

            \Log::info('User authenticated with Meta: ' . $contents);
            return $this->success([
                'token' => $user->createToken('API_TOKEN')->plainTextToken,
                'user' => $user,
            ], null, 200);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return $this->error(null, 'Error authenticating with Meta', 500);
        }
    }
}