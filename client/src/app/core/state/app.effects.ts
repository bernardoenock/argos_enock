import { AuthEffects } from './auth/auth.effects';
import { UsersEffects } from './users/users.effects';
import { PostsEffects } from './posts/posts.effects';
import { AlbumsEffects } from './albums/albums.effects';

export const appEffects = [
  AuthEffects,
  UsersEffects,
  PostsEffects,
  AlbumsEffects
];
