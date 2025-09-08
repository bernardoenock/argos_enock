import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.apiService.login(credentials).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ userData }) =>
        this.apiService.register(userData).pipe(
          map(user => AuthActions.registerSuccess({ user })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.apiService.logout()),
      map(() => AuthActions.logoutSuccess())
    )
  );

  loadUserFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromStorage),
      map(() => {
        const userData = localStorage.getItem('auth_user');
        if (userData) {
          const user = JSON.parse(userData);
          return AuthActions.loadUserFromStorageSuccess({ user });
        }
        return AuthActions.logoutSuccess();
      })
    )
  );
}
