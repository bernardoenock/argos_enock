import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { MainLayoutComponent } from './app/shared/components/templates/main-layout/main-layout.component';
import { routes } from './app/app.routes';
import { appReducers } from './app/core/state/app.reducer';
import { appEffects } from './app/core/state/app.effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  template: '<app-main-layout></app-main-layout>'
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),

    provideStore(appReducers),
    provideEffects(appEffects),
    provideRouterStore(),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
}).catch(err => console.error('Error starting the application:', err));
