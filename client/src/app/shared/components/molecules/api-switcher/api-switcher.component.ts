import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../atoms/button/button.component';
import { AppState } from '../../../../core/state/app.state';
import { selectCurrentApiEnvironment } from '../../../../core/state/app.selectors';
import { switchApiEnvironment } from '../../../../core/state/api/api.actions';
import { ApiEnvironment, API_ENVIRONMENTS } from '../../../../core/models/api.models';
import { ApiService } from '../../../../core/api/api.service';

@Component({
  selector: 'app-api-switcher',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './api-switcher.component.html',
  styleUrls: ['./api-switcher.component.css']
})
export class ApiSwitcherComponent implements OnInit {
  availableEnvironments = API_ENVIRONMENTS;
  currentEnvironment$: Observable<ApiEnvironment>;

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService
  ) {
    this.currentEnvironment$ = this.store.select(selectCurrentApiEnvironment);
  }

  ngOnInit(): void {}

  switchEnvironment(environment: ApiEnvironment): void {
    this.store.dispatch(switchApiEnvironment({ environment }));
    this.apiService.setApiEnvironment(environment);
  }

  getButtonClasses(environment: ApiEnvironment): string {
    const currentEnv = this.apiService.getCurrentEnvironment();
    const isActive = currentEnv.name === environment.name;

    return `api-button ${isActive ? 'active' : ''}`;
  }
}
