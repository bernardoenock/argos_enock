package com.api.argonock.controller;

import com.api.argonock.dto.PostResponseDTO;
import com.api.argonock.dto.AlbumResponseDTO;
import com.api.argonock.dto.TodoResponseDTO;
import com.api.argonock.dto.UserRequestDTO;
import com.api.argonock.dto.UserResponseDTO;
import com.api.argonock.model.User;
import com.api.argonock.service.UserService;
import com.api.argonock.service.PostService;
import com.api.argonock.service.AlbumService;
import com.api.argonock.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;
  private final PostService postService;
  private final AlbumService albumService;
  private final TodoService todoService;

  public UserController(UserService userService, PostService postService, AlbumService albumService,
      TodoService todoService) {
    this.userService = userService;
    this.postService = postService;
    this.albumService = albumService;
    this.todoService = todoService;
  }

  @GetMapping
  public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
    List<UserResponseDTO> users = userService.findAllUsers().stream()
        .map(UserResponseDTO::new)
        .collect(Collectors.toList());
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable String id) {
    return ResponseEntity.of(userService.findUserById(id).map(UserResponseDTO::new));
  }

  @GetMapping("/{id}/posts")
  public ResponseEntity<List<PostResponseDTO>> getPostsByUser(@PathVariable String id) {
    List<PostResponseDTO> posts = postService.findPostsByUserId(id);
    return ResponseEntity.ok(posts);
  }

  @GetMapping("/{id}/albums")
  public ResponseEntity<List<AlbumResponseDTO>> getAlbumsByUser(@PathVariable String id) {
    List<AlbumResponseDTO> albums = albumService.findAlbumsByUserId(id);
    return ResponseEntity.ok(albums);
  }

  @GetMapping("/{id}/todos")
  public ResponseEntity<List<TodoResponseDTO>> getTodosByUser(@PathVariable String id) {
    List<TodoResponseDTO> todos = todoService.getTodosByUserId(id);
    return ResponseEntity.ok(todos);
  }

  @PostMapping
  public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid UserRequestDTO userRequestDTO) {
    User createdUser = userService.createUser(userRequestDTO);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(createdUser.getId())
        .toUri();
    return ResponseEntity.created(location).body(new UserResponseDTO(createdUser));
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserResponseDTO> updateUser(@PathVariable String id,
      @RequestBody @Valid UserRequestDTO userRequestDTO) {
    return userService.updateUser(id, userRequestDTO)
        .map(updatedUser -> ResponseEntity.ok(new UserResponseDTO(updatedUser)))
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    boolean deleted = userService.deleteUser(id);
    if (deleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}