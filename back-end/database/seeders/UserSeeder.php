<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'firstname' => 'Admin',
            'lastname' => 'SuperAdmin',
            'email' => 'clarisse.thomas0902@gmail.com',
            'password' => Hash::make('SuperAdmin31'),
            'email_verified_at' => now(),
            'phone' => '1234567890',
            'role' => '1',
        ]);
    }
}
