import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./feature/auth/auth.module').then((m) => m.AuthModule), },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];
