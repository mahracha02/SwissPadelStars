<?php
namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Nom')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->maxLength(255),

                TextInput::make('password')
                    ->label('Mot de passe')
                    ->password()
                // Le champ est requis à la création, mais pas nécessairement en modification
                    ->required(fn(string $context): bool => $context === 'create')
                    ->minLength(8)
                // Hash le mot de passe uniquement si un état est fourni (pour éviter de le réinitialiser en modification)
                    ->dehydrateStateUsing(fn($state) => ! empty($state) ? Hash::make($state) : null)
                    ->dehydrated(fn($state) => filled($state)),

                TextInput::make('phone')
                    ->label('Numéro de téléphone')
                    ->maxLength(20),

                Select::make('role_id')
                    ->label('Rôle')
                    ->options(\App\Models\Role::pluck('name', 'id')->toArray())
                    ->searchable()
                    ->required()->afterStateHydrated(function ($component, $state, $record) {
                        // Si le record est présent et qu'aucune valeur n'est définie dans l'état
                        if ($record && blank($state)) {
                            $component->state($record->role);
                        }
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')->label('Email'),
                TextColumn::make('phone')->label('Numéro de téléphone'),
                TextColumn::make('role.name')
                    ->label('Rôle')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime('d/m/Y H:i')
                    ->label('Créé le'),
            ])
            ->filters([
                // Tu peux ajouter ici des filtres si nécessaire.
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit'   => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
