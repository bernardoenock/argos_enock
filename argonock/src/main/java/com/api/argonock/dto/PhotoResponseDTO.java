package com.api.argonock.dto;

import com.api.argonock.model.Photo;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoResponseDTO {

  private Long id;
  private Long albumId;
  private String title;
  private String url;
  private String thumbnailUrl;

  public PhotoResponseDTO(Photo photo) {
    this.id = photo.getId();
    this.albumId = photo.getAlbum().getId();
    this.title = photo.getTitle();
    this.url = photo.getUrl();
    this.thumbnailUrl = photo.getThumbnailUrl();
  }
}