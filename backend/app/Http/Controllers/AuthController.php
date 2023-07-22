<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Password;

class AuthController extends Controller
{
    use HttpResponses;

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            // Hash the password before saving it to the database
            'password' => Hash::make($request->password),
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
        ], 'User created successfully'
        );
    }

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if(!Auth::attempt($request->only('email', 'password'))) {
            return $this->error(null, 'Invalid credentials', 401);
        }

        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => auth()->user(),
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
        ]);
    }

    public function  logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success(null, 'Logged out successfully');
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $request->validated($request->all());

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? $this->success(null, __($status))
            : $this->error(null, __($status), 500);
    }

    public function resetPassword(ForgotPasswordRequest $request)
    {
        // to be filled
        throw new \Exception('Method not implemented');
    }
}
