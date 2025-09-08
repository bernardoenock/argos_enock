import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiSwitcherComponent } from '../../molecules/api-switcher/api-switcher.component';
import { UserMenuComponent } from '../../molecules/user-menu/user-menu.component';
import { AppState } from '../../../../core/state/app.state';
import { loadUserFromStorage } from '../../../../core/state/auth/auth.actions';
import { NavLinksComponent } from '../../molecules/nav-links/nav-links.component';
import { HamburgerButtonComponent } from '../../atoms/hamburger-button/hamburger-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ApiSwitcherComponent,
    UserMenuComponent,
    NavLinksComponent,
    HamburgerButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadUserFromStorage());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
