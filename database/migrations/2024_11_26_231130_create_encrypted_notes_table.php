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
        Schema::create('encrypted_notes', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->string('note');
            $table->string('iv');
            $table->string('salt');
            $table->dateTime('valid_until');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encrypted_notes');
    }
};
