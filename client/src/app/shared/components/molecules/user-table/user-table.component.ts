import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { LoadingSpinnerComponent } from '../../atoms/loading-spinner/loading-spinner.component';
import { User } from '../../../../core/models/api.models';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingSpinnerComponent, UserFormComponent],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: User[] | null = [];
  @Input() loading: boolean | null = false;

  userToDelete: User | null = null;

  showUserForm: boolean = false;
  editingUser: User | null = null;

  createNewUser() {
    this.editingUser = null;
    this.showUserForm = true;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.showUserForm = true;
  }
  closeUserForm() {
    this.showUserForm = false;
    this.editingUser = null;
  }

  viewUser(user: User) { alert(`View user ${user.name}`); }
  confirmDeleteUser(user: User) { this.userToDelete = user; }
  cancelDelete() { this.userToDelete = null; }
  performDelete() { alert(`Deleted user ${this.userToDelete?.name}`); this.userToDelete = null; }

  getUserInitials(user: User): string {
    return user.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2).toUpperCase();
  }

  trackByUserId(index: number, user: User) { return user.id; }
}
