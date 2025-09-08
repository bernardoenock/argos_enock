import { ApiEnvironment } from '../../models/api.models';

export interface ApiState {
  currentEnvironment: ApiEnvironment;
}

export const initialApiState: ApiState = {
  currentEnvironment: {
    name: 'jsonplaceholder',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    displayName: 'API JSONPlaceholder'
  }
};
