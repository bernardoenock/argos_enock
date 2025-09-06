package com.api.argonock.controller;

import com.api.argonock.dto.AlbumRequestDTO;
import com.api.argonock.dto.AlbumResponseDTO;
import com.api.argonock.model.Album;
import com.api.argonock.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/albums")
public class AlbumController {

  @Autowired
  private AlbumService albumService;

  @GetMapping
  public ResponseEntity<List<AlbumResponseDTO>> getAllAlbums(@RequestParam(required = false) String userId) {
    List<Album> albums;
    if (userId != null) {
      albums = albumService.findByUserId(userId);
    } else {
      albums = albumService.findAll();
    }

    List<AlbumResponseDTO> albumDTOs = albums.stream()
        .map(AlbumResponseDTO::new)
        .collect(Collectors.toList());
    return ResponseEntity.ok(albumDTOs);
  }

  @GetMapping("/{id}")
  public ResponseEntity<AlbumResponseDTO> getAlbumById(@PathVariable Long id) {
    return albumService.findById(id)
        .map(album -> ResponseEntity.ok(new AlbumResponseDTO(album)))
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<AlbumResponseDTO> createAlbum(@RequestBody @Valid AlbumRequestDTO albumRequestDTO,
      UriComponentsBuilder uriBuilder) {
    Album album = albumService.createAlbum(albumRequestDTO);
    URI uri = uriBuilder.path("/albums/{id}").buildAndExpand(album.getId()).toUri();
    return ResponseEntity.created(uri).body(new AlbumResponseDTO(album));
  }

  @PutMapping("/{id}")
  public ResponseEntity<AlbumResponseDTO> updateAlbum(@PathVariable Long id,
      @RequestBody @Valid AlbumRequestDTO albumRequestDTO) {
    Album updatedAlbum = albumService.updateAlbum(id, albumRequestDTO);
    return ResponseEntity.ok(new AlbumResponseDTO(updatedAlbum));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAlbum(@PathVariable Long id) {
    albumService.deleteAlbum(id);
    return ResponseEntity.noContent().build();
  }
}