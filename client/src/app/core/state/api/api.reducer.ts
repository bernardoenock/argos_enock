import { createReducer, on } from '@ngrx/store';
import { ApiState, initialApiState } from './api.state';
import * as ApiActions from './api.actions';

export const apiReducer = createReducer(
  initialApiState,

  on(ApiActions.switchApiEnvironment, (state, { environment }) => ({
    ...state,
    currentEnvironment: environment
  }))
);
