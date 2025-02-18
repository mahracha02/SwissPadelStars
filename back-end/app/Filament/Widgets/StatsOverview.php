<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\User;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Utilisateurs', User::count())
                ->description('Nombre total d\'utilisateurs')
                ->color('success')
                ->icon('heroicon-o-user-group'),

            Stat::make('Admins', User::role('admin')->count())
                ->description('Nombre total d\'administrateurs')
                ->color('danger')
                ->icon('heroicon-o-user-circle'),
        ];
    }
}

