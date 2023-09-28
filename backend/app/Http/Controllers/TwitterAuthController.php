<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\HttpResponses;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class TwitterAuthController extends Controller
{
    use HttpResponses;

    function redirectToTwitter()
    {
        \Log::info('User redirecting to Twitter for authentication');
        return $this->success([
            'url' => Socialite::driver('twitter')->stateless()->redirect()->getTargetUrl(),
        ], null, 200);
    }

    function handleTwitterCallback()
    {

        try {
            $socialiteUser = Socialite::driver('twitter')->stateless()->user();
        } catch (ClientException $e) {
            \Log::error('Error authenticating with Twitter: ' . $e->getMessage());
            return $this->error(null, 'Invalid credentials provided', 422);
        }

        /** @var User $user */
        $user = User::query()
            ->firstOrCreate(
                [
                    'email' => $socialiteUser->getEmail(),
                ],
                [
                    'email_verified_at' => now(),
                    'name' => $socialiteUser->getName(),
                    'twitter_id' => $socialiteUser->getId(),
                    'avatar' => $socialiteUser->getAvatar(),
                ]
            );

        \Log::info('User authenticated with Twitter: ' . $user->email);
        return $this->success([
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
            'user' => $user,
        ], "Twitter authentication successful", 200);
    }
}