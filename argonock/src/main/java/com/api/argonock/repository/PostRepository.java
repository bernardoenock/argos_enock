package com.api.argonock.repository;

import com.api.argonock.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
  List<Post> findByUserId(String userId);
}