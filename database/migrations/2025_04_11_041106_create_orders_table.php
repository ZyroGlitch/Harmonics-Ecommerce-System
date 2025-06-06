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
        Schema::create('orders', function (Blueprint $table) {
            $table->string('id',length:12)->primary()->unique();
            $table->foreignId('user_id')->constrained();
            $table->integer('quantity');
            $table->decimal('total',10,2);
            $table->decimal('cash_recieved',10,2)->nullable();
            $table->decimal('change',10,2)->nullable();
            $table->string('payment_method',length:50);
            $table->string('receipt_reference',length:50);
            $table->string('payment_receipt');
            $table->string('order_status')->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};