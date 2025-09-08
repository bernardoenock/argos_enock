import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiSwitcherComponent } from '../../molecules/api-switcher/api-switcher.component';
import { UserMenuComponent } from '../../molecules/user-menu/user-menu.component';
import { AppState } from '../../../../core/state/app.state';
import { loadUserFromStorage } from '../../../../core/state/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ApiSwitcherComponent,
    UserMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadUserFromStorage());
  }
}
