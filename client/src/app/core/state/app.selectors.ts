import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

// Root selectors
export const selectAuthState = (state: AppState) => state.auth;
export const selectApiState = (state: AppState) => state.api;
export const selectUsersState = (state: AppState) => state.users;
export const selectPostsState = (state: AppState) => state.posts;
export const selectAlbumsState = (state: AppState) => state.albums;

// Auth selectors
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

// API selectors
export const selectCurrentApiEnvironment = createSelector(
  selectApiState,
  (state) => state.currentEnvironment
);

// Users selectors
export const selectAllUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectSelectedUser = createSelector(
  selectUsersState,
  (state) => state.selectedUser
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.isLoading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

// Posts selectors
export const selectAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectSelectedPost = createSelector(
  selectPostsState,
  (state) => state.selectedPost
);

export const selectPostComments = createSelector(
  selectPostsState,
  (state) => state.comments
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.isLoading
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error
);

export const selectCurrentPage = createSelector(
  selectPostsState,
  (state) => state.currentPage
);

// Albums selectors
export const selectAllAlbums = createSelector(
  selectAlbumsState,
  (state) => state.albums
);

export const selectSelectedAlbum = createSelector(
  selectAlbumsState,
  (state) => state.selectedAlbum
);

export const selectAlbumPhotos = createSelector(
  selectAlbumsState,
  (state) => state.photos
);

export const selectAlbumsLoading = createSelector(
  selectAlbumsState,
  (state) => state.isLoading
);

export const selectAlbumsError = createSelector(
  selectAlbumsState,
  (state) => state.error
);
