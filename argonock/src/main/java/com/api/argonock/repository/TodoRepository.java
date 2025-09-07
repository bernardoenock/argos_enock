package com.api.argonock.repository;

import com.api.argonock.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
  List<Todo> findByUserId(String userId);
}