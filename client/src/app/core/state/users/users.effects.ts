import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.apiService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      exhaustMap(({ user }) =>
        this.apiService.createUser(user).pipe(
          map(createdUser => UsersActions.createUserSuccess({ user: createdUser })),
          catchError(error => of(UsersActions.createUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      exhaustMap(({ id, user }) =>
        this.apiService.updateUser(id, user).pipe(
          map(updatedUser => UsersActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UsersActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      exhaustMap(({ id }) =>
        this.apiService.deleteUser(id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError(error => of(UsersActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
}
