<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->label('Titre')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Description')
                    ->maxLength(65535),

                DatePicker::make('start_date')
                    ->label('Date de début')
                    ->required(),

                DatePicker::make('end_date')
                    ->label('Date de fin')
                    ->required(),

                TextInput::make('location')
                    ->label('Lieu')
                    ->maxLength(255),

                TextInput::make('category')
                    ->label('Catégorie')
                    ->maxLength(255),

                FileUpload::make('image')
                    ->label('Affiche / Image')
                    ->directory('events')
                    ->image()
                    ->maxSize(2048),
            ]);
    }

    /**
     * Table pour lister les événements
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('location')
                    ->label('Lieu')
                    ->limit(25)
                    ->searchable(),

                TextColumn::make('category')
                    ->label('Catégorie')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('start_date')
                    ->label('Débute le')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('end_date')
                    ->label('Se termine le')
                    ->date('d/m/Y')
                    ->sortable(),

                ImageColumn::make('image')
                    ->label('Image')
                    ->square(),

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
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
