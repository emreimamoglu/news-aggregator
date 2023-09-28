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
        \Log::info('User redirecting to Google for authentication');
        return $this->success([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ], null, 200);
    }

    public function handleGoogleCallback()
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (ClientException $e) {
            \Log::error('Error authenticating with Google: ' . $e->getMessage());
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

        \Log::info('User authenticated with Google: ' . $user->email);
        return $this->success([
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
            'user' => $user,
        ], "Google authentication successful", 200);
    }
}