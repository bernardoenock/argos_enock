import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, switchMap } from 'rxjs/operators';
import { ButtonComponent } from '../../../shared/components/atoms/button/button.component';
import { LoadingSpinnerComponent } from '../../../shared/components/atoms/loading-spinner/loading-spinner.component';
import { AppState } from '../../../core/state/app.state';
import {
  selectSelectedAlbum,
  selectAlbumPhotos,
  selectAlbumsLoading,
  selectAlbumsError
} from '../../../core/state/app.selectors';
import {
  selectAlbum,
  loadAlbumPhotos,
  clearAlbumsError
} from '../../../core/state/albums/albums.actions';
import { Album, Photo } from '../../../core/models/api.models';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  selectedAlbum$: Observable<Album | null>;
  photos$: Observable<Photo[]>;
  albumsLoading$: Observable<boolean>;
  albumsError$: Observable<string | null>;

  selectedPhoto: Photo | null = null;
  showOverlay = true;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.selectedAlbum$ = this.store.select(selectSelectedAlbum);
    this.photos$ = this.store.select(selectAlbumPhotos);
    this.albumsLoading$ = this.store.select(selectAlbumsLoading);
    this.albumsError$ = this.store.select(selectAlbumsError);
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(params => params['id']),
      switchMap(params => {
        const albumId = +params['id'];
        this.store.dispatch(selectAlbum({ albumId }));
        this.store.dispatch(loadAlbumPhotos({ albumId }));
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  viewFullSize(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closeModal(): void {
    this.selectedPhoto = null;
  }

  clearError(): void {
    this.store.dispatch(clearAlbumsError());
  }

  trackByPhotoId(index: number, photo: Photo): number {
    return photo.id;
  }
}
