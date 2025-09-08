import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../shared/components/atoms/button/button.component';
import { LoadingSpinnerComponent } from '../../shared/components/atoms/loading-spinner/loading-spinner.component';
import { AppState } from '../../core/state/app.state';
import { selectAllUsers, selectUsersLoading, selectUsersError } from '../../core/state/app.selectors';
import { loadUsers, deleteUser, clearUsersError } from '../../core/state/users/users.actions';
import { User } from '../../core/models/api.models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]>;
  usersLoading$: Observable<boolean | null>;
  usersError$: Observable<string | null>;

  userToDelete: User | null = null;

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(selectAllUsers);
    this.usersLoading$ = this.store.select(selectUsersLoading);
    this.usersError$ = this.store.select(selectUsersError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  createNewUser(): void {
    console.log('Create new user - feature to be implemented');
    alert('Create new user feature would open a form here');
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
    alert(`Edit user ${user.name} - feature to be implemented`);
  }

  viewUser(user: User): void {
    console.log('View user:', user);
    alert(`View user ${user.name} details - feature to be implemented`);
  }

  confirmDeleteUser(user: User): void {
    this.userToDelete = user;
  }

  cancelDelete(): void {
    this.userToDelete = null;
  }

  performDelete(): void {
    if (this.userToDelete) {
      this.store.dispatch(deleteUser({ id: this.userToDelete.id }));
      this.userToDelete = null;
    }
  }

  clearError(): void {
    this.store.dispatch(clearUsersError());
  }

  getUserInitials(user: User): string {
    return user.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getActiveUsersCount(): number {
    return Math.floor((this.getUsers().length * 0.8));
  }

  getCompaniesCount(): number {
    const users = this.getUsers();
    const companies = new Set(users.map(user => user.company.name));
    return companies.size;
  }

  private getUsers(): User[] {
    let users: User[] = [];
    this.users$.subscribe(data => users = data).unsubscribe();
    return users;
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
