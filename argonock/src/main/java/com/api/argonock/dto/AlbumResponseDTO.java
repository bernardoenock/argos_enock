package com.api.argonock.dto;

import com.api.argonock.model.Album;
import lombok.Data;

@Data
public class AlbumResponseDTO {

  private Long id;
  private String userId;
  private String title;

  public AlbumResponseDTO(Album album) {
    this.id = album.getId();
    this.userId = album.getUser().getId();
    this.title = album.getTitle();
  }
}