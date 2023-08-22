<?php

use App\Models\Product;
use App\Models\User;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/user')->group(function () {

        Route::get('/', function (Request $request) {
            return $request->user();
        });


        Route::put('/{user}', function (User $user, Request $request) {
            $updated_user = $request->validate([
                'accumulated_points' => ['numeric', 'required'],
                'id' => ['numeric', 'required'],
                'identification' => ['numeric', 'required'],
                'name' => ['required', 'string'],
                'role' => ['required']
            ]);

            $requestingUser = $request->user();


            if ($updated_user['id'] !== $user->id || $requestingUser->id !== $user->id) return response(null, 401);

            $user->accumulated_points = $updated_user['accumulated_points'];
            $user->identification = $updated_user['identification'];
            $user->name = $updated_user['name'];
            $user->role = $updated_user['role'];

            $user->save();

            return response(null, 200);
        });
    });

    Route::post('/product', function (Request $request) {
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
