import { createAction, props } from '@ngrx/store';
import { User } from '../../models/api.models';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);
export const selectUser = createAction(
  '[Users] Select User',
  props<{ userId: number }>()
);
export const createUser = createAction(
  '[Users] Create User',
  props<{ user: Partial<User> }>()
);
export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: string }>()
);
export const updateUser = createAction(
  '[Users] Update User',
  props<{ id: number; user: Partial<User> }>()
);
export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>()
);
export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const clearUsersError = createAction('[Users] Clear Error');
