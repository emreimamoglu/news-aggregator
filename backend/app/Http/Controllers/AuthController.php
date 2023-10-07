<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Password;

class AuthController extends Controller
{
    use HttpResponses;

    public function register(StoreUserRequest $request)
    {
        \Log::info('User registering with email: ' . $request->email . ' and name: ' . $request->name);
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
        \Log::info('User logging in with email: ' . $request->email);
        $request->validated($request->all());

        if (!Auth::attempt($request->only('email', 'password'))) {
            \Log::error('Invalid credentials for email: ' . $request->email);
            return $this->error(null, 'Invalid credentials', 401);
        }

        $user = User::where('email', $request->email)->first();
        $media = DB::table('files')
                ->where('id', intval($user->avatar_id))
                ->first();

        \Log::info('User logged in with email: ' . $request->email);
        return $this->success([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $media,
            ],
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        \Log::info('User logged out with email: ' . Auth::user()->email);
        return $this->success(null, 'Logged out successfully');
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $request->validated($request->all());

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            \Log::info('User successfully requested password reset with email: ' . $request->email);
            $this->success(null, __($status));
        } else {
            \Log::error('User failed to request password reset with email: ' . $request->email);
            $this->error(null, __($status), 500);
        }
    }

    public function resetPassword(ForgotPasswordRequest $request)
    {
        // to be filled
        throw new \Exception('Method not implemented');
    }

    public function deleteAccount(Request $request)
    {
        Auth::user()->delete();
        \Log::info('User deleted account with email: ' . Auth::user()->email);
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
            \Log::info('User changed password with email: ' . Auth::user()->email);
            return $this->success(null, 'Password changed successfully');
        } else {
            \Log::error('User failed to change password with email: ' . Auth::user()->email);
            return $this->error(null, 'Current password is incorrect', 422);
        }
    }

    public function currentUser()
    {
        try {
            $user = Auth::user();
            $media = DB::table('files')
                ->where('id', intval($user->avatar_id))
                ->first();

            if (!$user) {
                \Log::error('User not found');
                return $this->error(null, 'User not found', 404);
            }
            \Log::info('User found : ' . $user);
            return $this->success([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $media,
            ], null, 200);
        } catch (\Exception $e) {
            \Log::error('User not found' . $e->getMessage());
            return $this->error(null, 'Error while finding user', 500);
        }
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed',
            'name' => 'required',
            'email' => 'required|email',
            'image' => 'image|mimes:jpeg,png,jpg|max:2048',
            'avatarId' => 'required|string',
        ]);

        $user = Auth::user();

        if (Hash::check($request->password, $user->password)) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'avatar_id' => $request->avatarId,
            ]);

            \Log::info('User updated fields with email: ' . Auth::user()->email);

            return $this->success($user, 'Fields updated successfully');
        } else {
            \Log::error('User failed to update fields with email: ' . Auth::user()->email);
            return $this->error(null, 'Current password is incorrect', 422);
        }
    }
}