<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Administrador CalidexA',
            'email' => 'admin@calidexa.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Editor CalidexA',
            'email' => 'editor@calidexa.com',
            'password' => Hash::make('password123'),
            'role' => 'editor',
            'email_verified_at' => now(),
        ]);
    }
}