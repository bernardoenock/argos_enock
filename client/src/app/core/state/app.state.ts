import { RouterReducerState } from '@ngrx/router-store';
import { UsersState } from './users/users.state';
import { PostsState } from './posts/posts.state';
import { AlbumsState } from './albums/albums.state';
import { AuthState } from './auth/auth.state';
import { ApiState } from './api/api.state';

export interface AppState {
  router: RouterReducerState<any>;
  auth: AuthState;
  api: ApiState;
  users: UsersState;
  posts: PostsState;
  albums: AlbumsState;
}

export const initialAppState: AppState = {
  router: {} as RouterReducerState<any>,
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  api: {
    currentEnvironment: {
      name: 'jsonplaceholder',
      baseUrl: 'https://jsonplaceholder.typicode.com',
      displayName: 'API JSONPlaceholder'
    }
  },
  users: {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null
  },
  posts: {
    posts: [],
    selectedPost: null,
    comments: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null
  },
  albums: {
    albums: [],
    selectedAlbum: null,
    photos: [],
    isLoading: false,
    error: null
  }
};
