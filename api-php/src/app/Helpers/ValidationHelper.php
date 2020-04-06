<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ValidationHelper
{
    public function authenticateValidation($request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return $validator->errors()->all();
        }
        return [];
    }

    public function createUserValidation($request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'email' => 'required|email',
            'password' => 'required|string',
            'confirmed_password' => 'required|string|same:password',
        ]);
        if ($validator->fails()) {
            return $validator->errors()->all();
        }
        return [];
    }
}
