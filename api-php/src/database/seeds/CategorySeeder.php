<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $date = Carbon::now();
        $categories = [
            'Books',
            'Business and Industrial',
            'Clothing, Shoes, and accessories',
            'Collectibles',
            'Consumer Electronics',
            'Crafts',
            'Dolls and Bears',
            'Home and Garden',
            'Motors',
            'Pet Supplies',
            'Sporting Goods',
            'Toys',
            'Antiques',
            'Computers/Tablets & Networking',
        ];
        $categoriesToInsert = [];
        foreach ($categories as $category) {
            array_push($categoriesToInsert, [
                'name' => $category,
                'description' => 'test',
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }
        DB::table('categories')->insert($categoriesToInsert);
    }
}
