package com.api.argonock.controller;

import com.api.argonock.dto.PhotoRequestDTO;
import com.api.argonock.dto.PhotoResponseDTO;
import com.api.argonock.service.PhotoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/photos")
@SecurityRequirement(name = "bearer-auth")
public class PhotoController {

  @Autowired
  private PhotoService photoService;

  @GetMapping
  public ResponseEntity<List<PhotoResponseDTO>> getAllPhotos(@RequestParam(required = false) Long albumId) {
    if (albumId != null) {
      List<PhotoResponseDTO> photos = photoService.findPhotosByAlbumId(albumId);
      return ResponseEntity.ok(photos);
    }
    List<PhotoResponseDTO> photos = photoService.findAllPhotos();
    return ResponseEntity.ok(photos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PhotoResponseDTO> getPhotoById(@PathVariable Long id) {
    PhotoResponseDTO photo = photoService.findPhotoById(id);
    return ResponseEntity.ok(photo);
  }

  @PostMapping
  public ResponseEntity<PhotoResponseDTO> createPhoto(@RequestBody @Valid PhotoRequestDTO photoRequestDTO) {
    PhotoResponseDTO createdPhoto = photoService.createPhoto(photoRequestDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPhoto);
  }

  @PutMapping("/{id}")
  public ResponseEntity<PhotoResponseDTO> updatePhoto(@PathVariable Long id,
      @RequestBody @Valid PhotoRequestDTO photoRequestDTO) {
    PhotoResponseDTO updatedPhoto = photoService.updatePhoto(id, photoRequestDTO);
    return ResponseEntity.ok(updatedPhoto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
    photoService.deletePhoto(id);
    return ResponseEntity.noContent().build();
  }
}