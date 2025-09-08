import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  })),

  on(AuthActions.loadUserFromStorageSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false
  })),

  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null
  }))
);
