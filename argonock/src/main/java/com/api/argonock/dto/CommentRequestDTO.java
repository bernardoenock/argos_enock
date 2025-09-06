package com.api.argonock.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CommentRequestDTO(
    @NotBlank String name,
    @NotBlank @Email String email,
    @NotBlank String body) {
}