package com.api.argonock.controller;

import com.api.argonock.dto.TodoRequestDTO;
import com.api.argonock.dto.TodoResponseDTO;
import com.api.argonock.service.TodoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "bearerAuth")
public class TodoController {

  @Autowired
  private TodoService todoService;

  @GetMapping("/todos")
  public ResponseEntity<List<TodoResponseDTO>> getAllTodos() {
    List<TodoResponseDTO> todos = todoService.getAllTodos();
    return ResponseEntity.ok(todos);
  }

  @GetMapping("/todos/{id}")
  public ResponseEntity<TodoResponseDTO> getTodoById(@PathVariable Long id) {
    TodoResponseDTO todo = todoService.getTodoById(id);
    return ResponseEntity.ok(todo);
  }

  @GetMapping("/users/{userId}/todos")
  public ResponseEntity<List<TodoResponseDTO>> getTodosByUserId(@PathVariable String userId) {
    List<TodoResponseDTO> todos = todoService.getTodosByUserId(userId);
    return ResponseEntity.ok(todos);
  }

  @PostMapping("/users/{userId}/todos")
  public ResponseEntity<TodoResponseDTO> createTodo(
      @PathVariable String userId,
      @RequestBody @Valid TodoRequestDTO todoRequestDTO) {
    TodoResponseDTO newTodo = todoService.createTodo(todoRequestDTO, userId);
    return ResponseEntity.status(HttpStatus.CREATED).body(newTodo);
  }

  @PutMapping("/todos/{id}")
  public ResponseEntity<TodoResponseDTO> updateTodo(
      @PathVariable Long id,
      @RequestBody @Valid TodoRequestDTO todoRequestDTO) {
    TodoResponseDTO updatedTodo = todoService.updateTodo(id, todoRequestDTO);
    return ResponseEntity.ok(updatedTodo);
  }

  @DeleteMapping("/todos/{id}")
  public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
    todoService.deleteTodo(id);
    return ResponseEntity.noContent().build();
  }
}