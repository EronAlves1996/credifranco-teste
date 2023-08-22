<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/login", function (Request $request) {

    $credentials = $request->validate([
        'identification' => ['required'],
        'password' => ['required']
    ]);

    if (!Auth::attempt($credentials)) return response(null, 401);

    $request->session()->regenerate();

    return response()->json(Auth::user(), 200);
});

Route::middleware('auth:sanctum')->post('/product', function (Request $request) {
    $user = $request->user();

    if ($user->role !== 'MANAGER') return response(null, 401);

    $product = $request->validate([
        'product' => ['required', 'string'],
        'price' => ['required', 'numeric'],
        'discount' => ['required', 'numeric', 'between:0,100']
    ]);

    $product = Product::create($product);

    return response(null, 201, ['Location' => "/product/{$product->id}"]);
});
