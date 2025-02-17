<?php

namespace App\Filament\Admin\Resources\PadelProductResource\Pages;

use App\Filament\Admin\Resources\PadelProductResource;
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
