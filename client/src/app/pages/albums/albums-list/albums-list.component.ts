import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/atoms/button/button.component';
import { LoadingSpinnerComponent } from '../../../shared/components/atoms/loading-spinner/loading-spinner.component';
import { AppState } from '../../../core/state/app.state';
import { selectAllAlbums, selectAlbumsLoading, selectAlbumsError } from '../../../core/state/app.selectors';
import { loadAlbums, clearAlbumsError } from '../../../core/state/albums/albums.actions';
import { Album } from '../../../core/models/api.models';
import { AlbumsGridComponent } from '../../../shared/components/organisms/albums-grid/albums-grid.component';

@Component({
  selector: 'app-albums-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    LoadingSpinnerComponent,
    AlbumsGridComponent
  ],
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums$: Observable<Album[]>;
  albumsLoading$: Observable<boolean>;
  albumsError$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.albums$ = this.store.select(selectAllAlbums);
    this.albumsLoading$ = this.store.select(selectAlbumsLoading);
    this.albumsError$ = this.store.select(selectAlbumsError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAlbums());
  }

  clearError(): void {
    this.store.dispatch(clearAlbumsError());
  }
}
