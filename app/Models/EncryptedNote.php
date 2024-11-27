<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read string $id
 * @property string $note
 * @property string $salt
 * @property string $iv
 * @property CarbonImmutable $valid_until
 *
 * @method static EncryptedNote create(array $attributes)
 */
class EncryptedNote extends Model
{
    /** @use HasFactory<\Database\Factories\EncryptedNoteFactory> */
    use HasFactory, HasUlids;

    protected $fillable = [
        'note',
        'salt',
        'iv',
        'valid_until',
    ];

    protected $casts = [
        'valid_until' => 'immutable_datetime',
    ];
}
