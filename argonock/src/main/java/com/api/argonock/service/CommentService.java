package com.api.argonock.service;

import com.api.argonock.dto.CommentRequestDTO;
import com.api.argonock.dto.CommentResponseDTO;
import com.api.argonock.model.Comment;
import com.api.argonock.model.Post;
import com.api.argonock.repository.CommentRepository;
import com.api.argonock.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

  private final CommentRepository commentRepository;
  private final PostRepository postRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  public List<CommentResponseDTO> findByPostId(Long postId) {
    return commentRepository.findByPostId(postId).stream()
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  @Transactional
  public CommentResponseDTO createComment(Long postId, CommentRequestDTO commentDTO) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new IllegalArgumentException("Post não encontrado com o ID: " + postId));

    Comment comment = new Comment();
    comment.setName(commentDTO.name());
    comment.setEmail(commentDTO.email());
    comment.setBody(commentDTO.body());
    comment.setPost(post);

    Comment savedComment = commentRepository.save(comment);
    return mapToDTO(savedComment);
  }

  private CommentResponseDTO mapToDTO(Comment comment) {
    return new CommentResponseDTO(
        comment.getId(),
        comment.getName(),
        comment.getEmail(),
        comment.getBody(),
        comment.getPost().getId());
  }
}