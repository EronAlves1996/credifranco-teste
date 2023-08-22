<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CreateUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $manager = User::create([
            'name' => 'GERENTE',
            'identification' => "GERENTE",
            'identification_type' => 'gerente',
            'password' => '1234gerente',
            'accumulated_points' => 0
        ]);
        $manager->role = 'MANAGER';
        $manager->save();

        User::factory()
            ->count(5)
            ->create();
    }
}
