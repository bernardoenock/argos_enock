import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { User } from '../../../../core/models/api.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state/app.state';
import * as UsersActions from '../../../../core/state/users/users.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeForm = new EventEmitter<void>();

  userForm!: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select((state) => state.users.isLoading);
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.user?.name || '', [Validators.required]],
      username: [this.user?.username || '', [Validators.required]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || ''],
      companyName: [this.user?.company?.name || ''],
      companyCatchPhrase: [this.user?.company?.catchPhrase || ''],
      website: [this.user?.website || '']
    });
  }

  submitForm(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    const payload: Partial<User> = {
      name: formValue.name,
      username: formValue.username,
      email: formValue.email,
      phone: formValue.phone,
      website: formValue.website,
      company: {
        name: formValue.companyName,
        catchPhrase: formValue.companyCatchPhrase,
        bs: this.user?.company?.bs || ''
      },
      address: this.user?.address || {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      }
    };

    if (this.user) {
      this.store.dispatch(UsersActions.updateUser({ id: this.user.id, user: payload }));
    } else {
      this.store.dispatch(UsersActions.createUser({ user: payload }));
    }

    this.closeForm.emit();
  }

  cancel(): void {
    this.closeForm.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    this.cancel();
  }
}
