package com.api.argonock.service;

import com.api.argonock.dto.PostRequestDTO;
import com.api.argonock.dto.PostResponseDTO;
import com.api.argonock.model.Post;
import com.api.argonock.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

  @Autowired
  private PostRepository postRepository;

  public List<Post> findAllPosts() {
    return postRepository.findAll();
  }

  public Optional<Post> findPostById(Long id) {
    return postRepository.findById(id);
  }

  public Post createPost(Post post) {
    return postRepository.save(post);
  }

  public Post updatePost(Long id, PostRequestDTO requestDTO) {
    Post post = postRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Post not found for this id :: " + id));

    post.setTitle(requestDTO.getTitle());
    post.setBody(requestDTO.getBody());

    return postRepository.save(post);
  }

  public void deletePost(Long id) {
    postRepository.deleteById(id);
  }

  public List<PostResponseDTO> findPostsByUserId(String userId) {
    return postRepository.findByUserId(userId).stream()
        .map(post -> new PostResponseDTO(
            post.getId(),
            post.getUser().getId(),
            post.getTitle(),
            post.getBody()))
        .collect(Collectors.toList());
  }

  public boolean isPostOwner(Long postId, String userId) {
    return postRepository.findById(postId)
        .map(post -> post.getUser().getId().equals(userId))
        .orElse(false);
  }
}