<?php

use App\Models\EncryptedNote;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    EncryptedNote::query()->where('valid_until', '<', CarbonImmutable::now())->delete();
})->everyMinute();
