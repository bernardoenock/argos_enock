import { createAction, props } from '@ngrx/store';
import { ApiEnvironment } from '../../models/api.models';

export const switchApiEnvironment = createAction(
  '[API] Switch Environment',
  props<{ environment: ApiEnvironment }>()
);
