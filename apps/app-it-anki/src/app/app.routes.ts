import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'registration',
    pathMatch: 'full',
    title: 'Registration page',
    loadComponent: () =>
      import('./pages/registration-page/registration-page').then(
        (m) => m.RegistrationPage
      ),
  },
  {
    path: 'login',
    pathMatch: 'full',
    title: 'Login Page',
    loadComponent: () =>
      import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'public',
    pathMatch: 'full',
    title: 'Public Page',
    loadComponent: () =>
      import('./pages/public-page/public-page').then((m) => m.PublicPage),
  },
  {
    path: 'private',
    pathMatch: 'full',
    title: 'Private Page',
    loadComponent: () =>
      import('./pages/private-page/private-page').then((m) => m.PrivatePage),
  }
];
