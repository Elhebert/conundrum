<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Message/Create');
});

Route::post('/', [\App\Http\Controllers\EncryptedNoteController::class, 'store'])->name('note.store');
Route::get('/note/{id}', [\App\Http\Controllers\EncryptedNoteController::class, 'show'])->name('note.show');
