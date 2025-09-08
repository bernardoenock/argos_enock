import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import * as AlbumsActions from './albums.actions';

@Injectable()
export class AlbumsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbums),
      exhaustMap(() =>
        this.apiService.getAlbums().pipe(
          map(albums => AlbumsActions.loadAlbumsSuccess({ albums })),
          catchError(error => of(AlbumsActions.loadAlbumsFailure({ error: error.message })))
        )
      )
    )
  );

  loadAlbumPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbumPhotos),
      exhaustMap(({ albumId }) =>
        this.apiService.getAlbumPhotos(albumId).pipe(
          map(photos => AlbumsActions.loadAlbumPhotosSuccess({ photos })),
          catchError(error => of(AlbumsActions.loadAlbumPhotosFailure({ error: error.message })))
        )
      )
    )
  );
}
