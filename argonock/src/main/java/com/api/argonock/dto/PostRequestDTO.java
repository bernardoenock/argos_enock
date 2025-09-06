package com.api.argonock.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDTO {

  @NotNull(message = "O ID do usuário não pode ser nulo.")
  private String userId;

  @NotBlank(message = "O título não pode estar em branco.")
  private String title;

  @NotBlank(message = "O corpo do post não pode estar em branco.")
  private String body;
}