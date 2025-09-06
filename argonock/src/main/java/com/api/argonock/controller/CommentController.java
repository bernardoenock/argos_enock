package com.api.argonock.controller;

import com.api.argonock.dto.CommentRequestDTO;
import com.api.argonock.dto.CommentResponseDTO;
import com.api.argonock.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts/{postId}/comments")
@Tag(name = "Comments", description = "Endpoints para gerenciamento de comentários")
public class CommentController {

  private final CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @GetMapping
  @Operation(summary = "Lista comentários por post", description = "Retorna uma lista de comentários de um post específico")
  public ResponseEntity<List<CommentResponseDTO>> getCommentsByPostId(@PathVariable Long postId) {
    List<CommentResponseDTO> comments = commentService.findByPostId(postId);
    return ResponseEntity.ok(comments);
  }

  @PostMapping
  @SecurityRequirement(name = "bearerAuth")
  @Operation(summary = "Cria um novo comentário", description = "Cria um novo comentário para um post específico, requer autenticação JWT")
  public ResponseEntity<CommentResponseDTO> createComment(
      @PathVariable Long postId,
      @RequestBody @Valid CommentRequestDTO commentDTO) {
    CommentResponseDTO createdComment = commentService.createComment(postId, commentDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
  }
}