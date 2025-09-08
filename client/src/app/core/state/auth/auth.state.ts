import { AuthUser } from '../../models/api.models';

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};
