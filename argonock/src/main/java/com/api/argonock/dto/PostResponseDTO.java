package com.api.argonock.dto;

import com.api.argonock.model.Post;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {

  private Long id;
  private String userId;
  private String title;
  private String body;

  public PostResponseDTO(Post post) {
    this.id = post.getId();
    this.userId = post.getUser().getId();
    this.title = post.getTitle();
    this.body = post.getBody();
  }
}