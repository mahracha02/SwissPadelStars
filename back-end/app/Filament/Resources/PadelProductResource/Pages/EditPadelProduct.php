<?php

namespace App\Filament\Resources\PadelProductResource\Pages;

use App\Filament\Resources\PadelProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPadelProduct extends EditRecord
{
    protected static string $resource = PadelProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
