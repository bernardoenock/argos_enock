package com.api.argonock.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor; // <<< ADICIONAR ESTA ANOTAÇÃO

@Data
@NoArgsConstructor // <<< NECESSÁRIO PARA A DESSERIALIZAÇÃO DO JSON PELO JACKSON
public class PhotoRequestDTO {

  @NotNull(message = "O ID do álbum não pode ser nulo")
  private Long albumId;

  @NotBlank(message = "O título da foto não pode estar em branco")
  private String title;

  @NotBlank(message = "A URL da foto não pode estar em branco")
  private String url;

  private String thumbnailUrl;
}