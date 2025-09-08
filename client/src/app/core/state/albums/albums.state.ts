import { Album, Photo } from '../../models/api.models';

export interface AlbumsState {
  albums: Album[];
  selectedAlbum: Album | null;
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
}

export const initialAlbumsState: AlbumsState = {
  albums: [],
  selectedAlbum: null,
  photos: [],
  isLoading: false,
  error: null
};
