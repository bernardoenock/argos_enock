package com.api.argonock.dto;

import com.api.argonock.model.Todo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoResponseDTO {

  private Long id;
  private String userId;
  private String title;
  private boolean completed;

  public TodoResponseDTO(Todo todo) {
    this.id = todo.getId();
    this.userId = todo.getUser().getId();
    this.title = todo.getTitle();
    this.completed = todo.isCompleted();
  }
}