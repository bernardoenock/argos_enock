import { createAction, props } from '@ngrx/store';
import { AuthUser, LoginRequest, RegisterRequest } from '../../models/api.models';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ userData: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: AuthUser }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const loadUserFromStorage = createAction('[Auth] Load User From Storage');
export const loadUserFromStorageSuccess = createAction(
  '[Auth] Load User From Storage Success',
  props<{ user: AuthUser }>()
);

export const clearAuthError = createAction('[Auth] Clear Error');
