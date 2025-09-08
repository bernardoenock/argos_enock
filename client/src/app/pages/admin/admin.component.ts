import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/state/app.state';
import { selectAllUsers, selectUsersLoading, selectUsersError } from '../../core/state/app.selectors';
import { loadUsers, clearUsersError } from '../../core/state/users/users.actions';
import { User } from '../../core/models/api.models';
import { UserTableComponent } from '../../shared/components/molecules/user-table/user-table.component';
import { StatisticsCardComponent } from '../../shared/components/molecules/statistics-card/statistics-card.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    UserTableComponent,
    StatisticsCardComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]>;
  usersLoading$: Observable<boolean | null>;
  usersError$: Observable<string | null>;

  usersList: User[] = []; // para cálculos

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(selectAllUsers);
    this.usersLoading$ = this.store.select(selectUsersLoading);
    this.usersError$ = this.store.select(selectUsersError);
    this.users$.subscribe(data => this.usersList = data || []);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  clearError(): void {
    this.store.dispatch(clearUsersError());
  }

  getActiveUsersCount(): number {
    return Math.floor(this.usersList.length * 0.8);
  }

  getCompaniesCount(): number {
    const companies = new Set(this.usersList.map(u => u.company.name));
    return companies.size;
  }
}
