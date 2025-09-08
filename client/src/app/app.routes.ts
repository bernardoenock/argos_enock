import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts-list/posts-list.component').then(m => m.PostsListComponent)
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./pages/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
  {
    path: 'albums',
    loadComponent: () => import('./pages/albums/albums-list/albums-list.component').then(m => m.AlbumsListComponent)
  },
  {
    path: 'albums/:id',
    loadComponent: () => import('./pages/albums/album-detail/album-detail.component').then(m => m.AlbumDetailComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/admin/user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
