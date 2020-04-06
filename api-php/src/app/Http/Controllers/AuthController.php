<?php

namespace App\Http\Controllers;

use App\User;
use App\Helpers\ValidationHelper;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->validator = new ValidationHelper();
    }

    protected function jwt($user, $hours = 1)
    {
        $payload = [
            'iss' => "ancud-jwt",
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 60 * 60 * $hours
        ];
        return JWT::encode($payload, env('JWT_SECRET'));
    }

    public function login(Request $request)
    {
        $errors = $this->validator->authenticateValidation($request);
        if (! empty($errors)) {
            return response()->json(['data' => [], 'errors' => $errors], 200);
        }
        try {
            $user = User::where('email', $request->email)->firstOrFail();
            if (Hash::check($request->password, $user->password)) {
                $hours = (int) env('JWT_EXP_HOURS');
                $token = $this->jwt($user, $hours);
                return response()->json(['data' => $token, 'errors' => []], 200);
            }
            return response()->json(['data' => [], 'errors' => ['Email or Password is wrong']], 400);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['data' => [], 'errors' => ['Email or Password is wrong']], 400);
        }
    }

    public function validateUser(Request $request)
    {
        return response()->json(['data' => $request->auth, 'errors' => []], 200);
    }

    public function signin(Request $request)
    {
        $errors = $this->validator->createUserValidation($request);
        if (! empty($errors)) {
            return response()->json(['data' => [], 'errors' => $errors], 422);
        }
        $oldUser = User::where('email', $request->mail)->first();
        if ($oldUser) {
            return response()->json(['data' => [], 'errors' => ['User could not be created']], 409);
        }
        try {
            $newUser = new User();
            $newUser->name = $request->name;
            $newUser->email = $request->email;
            $newUser->password = Hash::make($request->password);
            $newUser->save();
            return response()->json(['data' => $newUser, 'errors' => []], 201);
        } catch (\Illuminate\Database\QueryException | \Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['data' => [], 'errors' => ['User could not be created']], 409);
        }
    }
}
