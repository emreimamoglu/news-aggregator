<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\HttpResponses;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    use HttpResponses;

    public function redirectToGoogle()
    {
        return $this->success([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ], null, 200);
    }

    public function handleGoogleCallback()
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (ClientException $e) {
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
                    'google_id' => $socialiteUser->getId(),
                    'avatar' => $socialiteUser->getAvatar(),
                ]
            );

        return $this->success([
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
            'user' => $user,
        ], "Google authentication successful", 200);
    }
}