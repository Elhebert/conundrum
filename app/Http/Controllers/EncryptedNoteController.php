<?php

namespace App\Http\Controllers;

use App\Http\Requests\EncryptedNoteStoreRequest;
use App\Models\EncryptedNote;
use Illuminate\Contracts\Encryption\Encrypter;
use Inertia\Inertia;
use Inertia\Response;

readonly class EncryptedNoteController
{
    public function __construct(private Encrypter $encrypter) {}

    public function store(EncryptedNoteStoreRequest $request): Response
    {
        $note = EncryptedNote::create($request->validated());
        $link = route('note.show', $this->encrypter->encryptString($note->id));

        return Inertia::render('Message/Create', ['link' => $link]);
    }

    public function show(string $id): Response
    {
        $decryptedId = $this->encrypter->decryptString($id);
        $note = EncryptedNote::query()->findOrFail($decryptedId);
        $payload = ['note' => $note->note, 'salt' => $note->salt, 'iv' => $note->iv];

        $note->delete();

        return Inertia::render('Message/Show', $payload);
    }
}
