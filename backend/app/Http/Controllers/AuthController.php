<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
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

        return $this->success(
            [
                'user' => $user,
                'token' => $user->createToken('API_TOKEN')->plainTextToken,
            ],
            'User created successfully'
        );
    }

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error(null, 'Invalid credentials', 401);
        }

        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => auth()->user(),
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
        ]);
    }

    public function logout()
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

    public function deleteAccount(Request $request)
    {
        Auth::user()->delete();
        return $this->success(null, 'Account deleted successfully');
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = Auth::user();

        if (Hash::check($request->current_password, $user->password)) {
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);
            return $this->success(null, 'Password changed successfully');
        } else {
            return $this->error(null, 'Current password is incorrect', 422);
        }
    }

    public function currentUser()
    {
        $user = Auth::user();

        if (!$user) {
            return $this->error(null, 'User not found', 404);
        }

        return $this->success($user, null, 200);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed',
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user = Auth::user();
        
        if (Hash::check($request->password, $user->password)) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);
            return $this->success(null, 'Fields updated successfully');
        } else {
            return $this->error(null, 'Current password is incorrect', 422);
        }
    }
}