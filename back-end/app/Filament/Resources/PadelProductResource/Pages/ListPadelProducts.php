<?php

namespace App\Filament\Resources\PadelProductResource\Pages;

use App\Filament\Resources\PadelProductResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPadelProducts extends ListRecords
{
    protected static string $resource = PadelProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
