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
        Schema::create('walk_in_checkout_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('checkout_rec_id');
            $table->foreignId('product_id')->constrained();
            $table->integer('quantity');
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();

            // Include Foreign Key
            $table->foreign('checkout_rec_id')
            ->references('id')
            ->on('walkin_checkout_records')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('walk_in_checkout_details');
    }
};