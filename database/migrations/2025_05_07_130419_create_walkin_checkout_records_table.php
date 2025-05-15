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
        Schema::create('walkin_checkout_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('customer_name');
            $table->integer('quantity');
            $table->decimal('total', 10, 2);
            $table->decimal('cash_received', 10, 2);
            $table->decimal('change', 10, 2);
            $table->string('payment_method',length:50)->default('Cash');
            $table->string('order_status')->default('Completed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('walkin_checkout_records');
    }
};