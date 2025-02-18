<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::factory()->create([
            'name' => 'SuperAdmin',
            'description' => 'This is the super admin role',
        ]);
        Role::factory()->create([
            'name' => 'Admin',
            'description' => 'This is the admin role',
        ]);
        Role::factory()->create([
            'name' => 'User',
            'description' => 'This is the user role',
        ]);
    }
}
