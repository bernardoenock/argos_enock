import { createAction, props } from '@ngrx/store';
import { Album, Photo } from '../../models/api.models';

export const loadAlbums = createAction('[Albums] Load Albums');
export const loadAlbumsSuccess = createAction(
  '[Albums] Load Albums Success',
  props<{ albums: Album[] }>()
);
export const loadAlbumsFailure = createAction(
  '[Albums] Load Albums Failure',
  props<{ error: string }>()
);

export const selectAlbum = createAction(
  '[Albums] Select Album',
  props<{ albumId: number }>()
);

export const loadAlbumPhotos = createAction(
  '[Albums] Load Album Photos',
  props<{ albumId: number }>()
);
export const loadAlbumPhotosSuccess = createAction(
  '[Albums] Load Album Photos Success',
  props<{ photos: Photo[] }>()
);
export const loadAlbumPhotosFailure = createAction(
  '[Albums] Load Album Photos Failure',
  props<{ error: string }>()
);

export const clearAlbumsError = createAction('[Albums] Clear Error');
