package com.api.argonock.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequestDTO {

  @NotBlank(message = "Title cannot be empty")
  private String title;

  @NotNull(message = "Completed status is mandatory")
  private Boolean completed;
}