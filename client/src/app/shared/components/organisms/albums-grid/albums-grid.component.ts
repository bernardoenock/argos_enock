import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../../../../core/models/api.models';
import { AlbumCardComponent } from '../../molecules/album-card/album-card.component';

@Component({
  selector: 'app-albums-grid',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent],
  templateUrl: './albums-grid.component.html',
  styleUrls: ['./albums-grid.component.css']
})
export class AlbumsGridComponent {
  @Input() albums: Album[] = [];

  trackByAlbumId(index: number, album: Album): number {
    return album.id;
  }
}
