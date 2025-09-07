package com.api.argonock.service;

import com.api.argonock.dto.TodoRequestDTO;
import com.api.argonock.dto.TodoResponseDTO;
import com.api.argonock.model.Todo;
import com.api.argonock.model.User;
import com.api.argonock.repository.TodoRepository;
import com.api.argonock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

  @Autowired
  private TodoRepository todoRepository;

  @Autowired
  private UserRepository userRepository;

  public List<TodoResponseDTO> getAllTodos() {
    return todoRepository.findAll().stream()
        .map(TodoResponseDTO::new)
        .collect(Collectors.toList());
  }

  public TodoResponseDTO getTodoById(Long id) {
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found with id " + id));
    return new TodoResponseDTO(todo);
  }

  public List<TodoResponseDTO> getTodosByUserId(String userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id " + userId));
    return todoRepository.findByUserId(userId).stream()
        .map(TodoResponseDTO::new)
        .collect(Collectors.toList());
  }

  public TodoResponseDTO createTodo(TodoRequestDTO todoRequestDTO, String userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id " + userId));

    Todo todo = new Todo();
    todo.setTitle(todoRequestDTO.getTitle());
    todo.setCompleted(todoRequestDTO.getCompleted());
    todo.setUser(user);

    todo = todoRepository.save(todo);
    return new TodoResponseDTO(todo);
  }

  public TodoResponseDTO updateTodo(Long id, TodoRequestDTO todoRequestDTO) {
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found with id " + id));

    if (todoRequestDTO.getTitle() != null) {
      todo.setTitle(todoRequestDTO.getTitle());
    }
    if (todoRequestDTO.getCompleted() != null) {
      todo.setCompleted(todoRequestDTO.getCompleted());
    }

    todo = todoRepository.save(todo);
    return new TodoResponseDTO(todo);
  }

  public void deleteTodo(Long id) {
    if (!todoRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found with id " + id);
    }
    todoRepository.deleteById(id);
  }
}