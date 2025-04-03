<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trackers', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address');       // Visitor's IP
            $table->date('date')->index();      // Date-only for daily grouping
            $table->string('user_agent')->nullable();
            $table->string('url');
            $table->timestamps();

            // Composite index for fast lookups
            $table->index(['ip_address', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trackers');
    }
};
