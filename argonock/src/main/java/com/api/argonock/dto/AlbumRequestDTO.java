package com.api.argonock.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AlbumRequestDTO {

  @NotNull(message = "O ID do usuário não pode ser nulo.")
  private String userId;

  @NotBlank(message = "O título não pode estar em branco.")
  private String title;
}