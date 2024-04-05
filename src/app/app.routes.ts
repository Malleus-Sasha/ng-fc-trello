import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found-component/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.routes').then(mod => mod.AUTH_ROUTES) },
    { path: 'trello', loadChildren: () => import('./modules/trello/trello.routes').then(mod => mod.TRELLO_ROUTES) },
    { path: '**', component: PageNotFoundComponent }
];
