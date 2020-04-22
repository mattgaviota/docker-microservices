<?php

namespace App\Http\Controllers;

use App\User;
use App\Helpers\ValidationHelper;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


/**
 * @OA\Info(title="User service API", version="0.1")
 */
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


    /**
     * @OA\Post(
     *     path="/api/login",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 example={"email": "test@test.test", "password": "12345"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Json web Token",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="data",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="errors",
     *                     @OA\Schema(
     *                        type="array",
     *                        @OA\Items(type="string"),
     *                      ),
     *                 ),
     *                 example={"data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...", "errors": "[]"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response=400, description="Email or Password is wrong"),
     *     @OA\Response(response=422, description="Validation Error"),
     * )
     */
    public function login(Request $request)
    {
        $errors = $this->validator->authenticateValidation($request);
        if (! empty($errors)) {
            return response()->json(['data' => [], 'errors' => $errors], 422);
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

    /**
     * @OA\Post(
     *     path="/api/validate",
     *     @OA\Response(
     *          response="200",
     *          description="Logged User",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="data",
     *                     @OA\Schema(
     *                         @OA\Property(
     *                             property="id",
     *                             type="string"
     *                         ),
     *                         @OA\Property(
     *                             property="name",
     *                             type="string"
     *                         ),
     *                         @OA\Property(
     *                             property="email",
     *                             type="string"
     *                         ),
     *                     ),
     *                 ),
     *                 @OA\Property(
     *                     property="errors",
     *                     @OA\Schema(
     *                        type="array",
     *                        @OA\Items(type="string"),
     *                      ),
     *                 ),
     *                 example={"data": {"id": 1, "name": "Matt", "email": "matt@test.test"}, "errors": "[]"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response=401, description="User could not be validated"),
     *     @OA\Response(response=422, description="Validation Error"),
     * )
     */
    public function validateUser(Request $request)
    {
        return response()->json(['data' => $request->auth, 'errors' => []], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/signin",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="confirmed_password",
     *                     type="string"
     *                 ),
     *                 example={"name": "Matias Novoa", "email": "test@test.test", "password": "12345", "confirmed_password": "12345"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Logged User",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="data",
     *                     @OA\Schema(
     *                         @OA\Property(
     *                             property="id",
     *                             type="string"
     *                         ),
     *                         @OA\Property(
     *                             property="name",
     *                             type="string"
     *                         ),
     *                         @OA\Property(
     *                             property="email",
     *                             type="string"
     *                         ),
     *                     ),
     *                 ),
     *                 @OA\Property(
     *                     property="errors",
     *                     @OA\Schema(
     *                        type="array",
     *                        @OA\Items(type="string"),
     *                      ),
     *                 ),
     *                 example={"data": {"id": 1, "name": "Matt", "email": "matt@test.test"}, "errors": "[]"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response=409, description="User could not be created"),
     *     @OA\Response(response=422, description="Validation Error"),
     * )
     */
    public function signup(Request $request)
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
