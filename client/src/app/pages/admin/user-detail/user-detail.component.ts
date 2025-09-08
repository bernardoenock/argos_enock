import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { AppState } from '../../../core/state/app.state';
import { selectSelectedUser, selectUsersLoading, selectUsersError } from '../../../core/state/app.selectors';
import { selectUser, clearUsersError } from '../../../core/state/users/users.actions';
import { User } from '../../../core/models/api.models';
import { LoadingSpinnerComponent } from '../../../shared/components/atoms/loading-spinner/loading-spinner.component';
import { ButtonComponent } from '../../../shared/components/atoms/button/button.component';
import { UserInfoComponent } from '../../../shared/components/molecules/user-info/user-info.component';
import { UserAddressComponent } from '../../../shared/components/molecules/user-address/user-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ButtonComponent,
    UserInfoComponent,
    UserAddressComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  selectedUser$: Observable<User | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.isLoading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params => {
        const userId = +params['id'];
        this.store.dispatch(selectUser({ userId }));
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearError(): void {
    this.store.dispatch(clearUsersError());
  }
}
