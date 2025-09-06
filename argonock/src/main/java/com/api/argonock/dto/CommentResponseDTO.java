package com.api.argonock.dto;

public record CommentResponseDTO(
    Long id,
    String name,
    String email,
    String body,
    Long postId) {
}