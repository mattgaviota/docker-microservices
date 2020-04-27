<?php

use App\Category;
use App\User;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $date = Carbon::now();
        $faker = Faker::create();
        $categories = Category::get();
        $users = User::where('usertype', 'seller')->get();
        $productsToInsert = [];
        foreach ($users as $user) {
            foreach ($categories as $category) {
                for ($i=0; $i < 5; $i++) {
                    array_push($productsToInsert, [
                        'name' => $faker->word,
                        'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                        'amount' => $faker->numberBetween(0, 50),
                        'price' => $faker->randomFloat(0, 100, 1000),
                        'user_id' => $user->id,
                        'category_id' => $category->id,
                        'created_at' => $date,
                        'updated_at' => $date,
                    ]);
                }
            }
        }
        db::table('products')->insert($productsToInsert);
    }
}
