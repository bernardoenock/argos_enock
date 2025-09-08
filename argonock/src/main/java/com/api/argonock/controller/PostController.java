package com.api.argonock.controller;

import com.api.argonock.dto.PostRequestDTO;
import com.api.argonock.dto.PostResponseDTO;
import com.api.argonock.model.Post;
import com.api.argonock.model.User;
import com.api.argonock.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

  @Autowired
  private PostService postService;

  @GetMapping
  public List<PostResponseDTO> getAllPosts() {
    return postService.findAllPosts().stream()
        .map(PostResponseDTO::new)
        .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id) {
    return postService.findPostById(id)
        .map(post -> ResponseEntity.ok(new PostResponseDTO(post)))
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<PostResponseDTO> createPost(@RequestBody @Valid PostRequestDTO requestDTO) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User authenticatedUser = (User) authentication.getPrincipal();

    Post postToCreate = new Post();
    postToCreate.setUser(authenticatedUser);
    postToCreate.setTitle(requestDTO.getTitle());
    postToCreate.setBody(requestDTO.getBody());

    Post createdPost = postService.createPost(postToCreate);
    return new ResponseEntity<>(new PostResponseDTO(createdPost), HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long id,
      @RequestBody @Valid PostRequestDTO requestDTO) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User authenticatedUser = (User) authentication.getPrincipal();

    if (!postService.isPostOwner(id, authenticatedUser.getId())) {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    try {
      Post updatedPost = postService.updatePost(id, requestDTO);
      return ResponseEntity.ok(new PostResponseDTO(updatedPost));
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePost(@PathVariable Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User authenticatedUser = (User) authentication.getPrincipal();

    if (!postService.isPostOwner(id, authenticatedUser.getId())) {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    try {
      postService.deletePost(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping(params = "userId")
  public ResponseEntity<List<PostResponseDTO>> getPostsByUserId(@RequestParam String userId) {
    List<PostResponseDTO> posts = postService.findPostsByUserId(userId);
    return ResponseEntity.ok(posts);
  }
}
