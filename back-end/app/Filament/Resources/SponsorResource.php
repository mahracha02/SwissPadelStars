<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SponsorResource\Pages;
use App\Models\Sponsor;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class SponsorResource extends Resource
{
    protected static ?string $model = Sponsor::class;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Nom du sponsor')
                    ->required()
                    ->maxLength(255),

                TextInput::make('contact')
                    ->label('Contact')
                    ->maxLength(255)
                    ->placeholder('Nom ou email de la personne à contacter'),

                Select::make('type')
                    ->label('Type de sponsor')
                    ->options([
                        'premium' => 'Premium',
                        'gold'    => 'Gold',
                        'silver'  => 'Silver',
                        'bronze'  => 'Bronze',
                    ])
                    ->searchable()
                    ->required(),

                FileUpload::make('image')
                    ->label('Logo / Image')
                    ->directory('sponsors')
                    ->image()
                    ->maxSize(1024),
            ]);
    }

    /**
     * Table pour lister les sponsors
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('contact')
                    ->label('Contact')
                    ->limit(25)
                    ->searchable(),

                TextColumn::make('type')
                    ->label('Type')
                    ->searchable()
                    ->sortable(),

                ImageColumn::make('image')
                    ->label('Logo')
                    ->square()
                    ->circular(), // Optionnel, pour un rendu arrondi

                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                // Ajoute ici des filtres si nécessaire
            ]);
    }

    /**
     * Définit les pages associées à la resource (liste, création, édition)
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSponsors::route('/'),
            'create' => Pages\CreateSponsor::route('/create'),
            'edit' => Pages\EditSponsor::route('/{record}/edit'),
        ];
    }
}
