import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { apiReducer } from './api/api.reducer';
import { usersReducer } from './users/users.reducer';
import { postsReducer } from './posts/posts.reducer';
import { albumsReducer } from './albums/albums.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  api: apiReducer,
  users: usersReducer,
  posts: postsReducer,
  albums: albumsReducer
};
