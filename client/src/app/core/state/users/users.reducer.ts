import { createReducer, on } from '@ngrx/store';
import { UsersState, initialUsersState } from './users.state';
import * as UsersActions from './users.actions';

export const usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.loadUsers, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
    error: null
  })),

  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(UsersActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUser: state.users.find(user => user.id === userId) || null
  })),

  on(UsersActions.createUser, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsersActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    isLoading: false,
    error: null
  })),

  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(UsersActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
    isLoading: false,
    error: null
  })),

  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(UsersActions.deleteUser, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
    isLoading: false,
    error: null
  })),

  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(UsersActions.clearUsersError, (state) => ({
    ...state,
    error: null
  }))
);
