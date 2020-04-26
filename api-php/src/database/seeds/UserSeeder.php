<?php

use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usersToInsert = [];
        $date = Carbon::now();
        $faker = Faker::create();
        for ($i=0; $i < 10; $i++) {
            array_push($usersToInsert, [
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('test1234'),
                'usertype' => $faker->randomElement(['seller', 'buyer']),
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }
        db::table('users')->insert($usersToInsert);
    }
}
