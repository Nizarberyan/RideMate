<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
     
        if (Schema::hasColumn('users', 'driver_status')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('driver_status');
            });
        }
    }

    public function down(): void
    {
        if (!Schema::hasColumn('users', 'driver_status')) {
            Schema::table('users', function (Blueprint $table) {
                $table->timestamp('driver_status')->nullable();
            });
        }
    }
};