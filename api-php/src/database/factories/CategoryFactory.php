<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name' => $faker->randomElement([
            'Dairy, Eggs & Cheese',
            'Beer, Wine & Spirits',
            'Fruits & Vegetables',
            'Frozen Foods',
            'Cookies, Snacks & Candy',
            'Bread & Bakery',
            'Paper Products',
            'Meat & Seafood',
            'Pharmacy',
        ]),
        'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
    ];
});
