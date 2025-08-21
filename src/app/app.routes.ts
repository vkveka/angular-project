import { Routes } from '@angular/router';
import { AboutContent } from './components/about-content/about-content';
import { UserProfile } from './components/user-profile/user-profile';
// import { meRedirectGuard } from './resolvers/user.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutContent
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register').then(m => m.Register)
    },
    {
        path: 'contact',
        loadComponent: () => import('./components/contact/contact').then(m => m.Contact)
    },
    { path: 'profile', component: UserProfile },
    {
        path: 'home',
        loadComponent: () => import('./components/main-content/main-content').then(m => m.MainContent)
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
