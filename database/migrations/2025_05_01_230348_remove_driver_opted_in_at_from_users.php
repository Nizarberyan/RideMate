<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
     
        if (Schema::hasColumn('users', 'driver_opted_in_at')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('driver_opted_in_at');
            });
        }
    }

    public function down(): void
    {
        if (!Schema::hasColumn('users', 'driver_opted_in_at')) {
            Schema::table('users', function (Blueprint $table) {
                $table->timestamp('driver_opted_in_at')->nullable();
            });
        }
    }
};