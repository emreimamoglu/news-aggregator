<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SavedArticleController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\CategorySubscriptionController;
use App\Http\Controllers\SourceSubscriptionController;
use App\NewsUtils\NewsFetcher;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



# Public Routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');


# Protected Routes

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('delete-account', [AuthController::class, 'deleteAccount']);
    Route::post('change-password', [AuthController::class, 'changePassword']);

    # API Resources

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('sources', SourceController::class);
    Route::apiResource('authors', AuthorController::class);
    Route::apiResource('category-subscriptions', CategorySubscriptionController::class, ['except' => ['update']]);
    Route::apiResource('source-subscriptions', SourceSubscriptionController::class, ['except' => ['update']]);
    Route::apiResource('saved-articles', SavedArticleController::class, ['except' => ['update']]);
    Route::apiResource('articles', ArticleController::class)->except(['index', 'show']);
    Route::get('user-saved-articles', [SavedArticleController::class, 'userSavedArticles']);
    
});

Route::apiResource('articles', ArticleController::class)->except(['destroy', 'update', 'store']);


// Route::get('test', function () {
//     $fetcher = new NewsFetcher();
//     $fetcher->fetchAndStoreNews();

//     return response()->json(Carbon::now()->subDay()->toDateString());
// });