import { createReducer, on } from '@ngrx/store';
import { AlbumsState, initialAlbumsState } from './albums.state';
import * as AlbumsActions from './albums.actions';

export const albumsReducer = createReducer(
  initialAlbumsState,

  on(AlbumsActions.loadAlbums, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AlbumsActions.loadAlbumsSuccess, (state, { albums }) => ({
    ...state,
    albums,
    isLoading: false,
    error: null
  })),

  on(AlbumsActions.loadAlbumsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(AlbumsActions.selectAlbum, (state, { albumId }) => ({
    ...state,
    selectedAlbum: state.albums.find(album => album.id === albumId) || null
  })),

  on(AlbumsActions.loadAlbumPhotos, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AlbumsActions.loadAlbumPhotosSuccess, (state, { photos }) => ({
    ...state,
    photos,
    isLoading: false,
    error: null
  })),

  on(AlbumsActions.loadAlbumPhotosFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(AlbumsActions.clearAlbumsError, (state) => ({
    ...state,
    error: null
  }))
);
