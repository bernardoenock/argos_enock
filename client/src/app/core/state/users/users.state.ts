import { User } from '../../models/api.models';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export const initialUsersState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null
};
