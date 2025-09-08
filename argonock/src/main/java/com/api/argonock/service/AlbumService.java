package com.api.argonock.service;

import com.api.argonock.dto.AlbumRequestDTO;
import com.api.argonock.dto.AlbumResponseDTO;
import com.api.argonock.model.Album;
import com.api.argonock.model.User;
import com.api.argonock.repository.AlbumRepository;
import com.api.argonock.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlbumService {

  @Autowired
  private AlbumRepository albumRepository;

  @Autowired
  private UserRepository userRepository;

  public List<Album> findAll() {
    return albumRepository.findAll();
  }

  public List<Album> findByUserId(String userId) {
    return albumRepository.findByUserId(userId);
  }

  public List<AlbumResponseDTO> findAlbumsByUserId(String userId) {
    return albumRepository.findByUserId(userId).stream()
        .map(album -> new AlbumResponseDTO(
            album.getId(),
            album.getUser().getId(),
            album.getTitle()))
        .collect(Collectors.toList());
  }

  public Optional<Album> findById(Long id) {
    return albumRepository.findById(id);
  }

  public Album createAlbum(AlbumRequestDTO albumRequestDTO) {
    User user = userRepository.findById(albumRequestDTO.getUserId())
        .orElseThrow(
            () -> new EntityNotFoundException("Usuário não encontrado com o ID: " + albumRequestDTO.getUserId()));

    Album newAlbum = new Album();
    newAlbum.setTitle(albumRequestDTO.getTitle());
    newAlbum.setUser(user);

    return albumRepository.save(newAlbum);
  }

  public Album updateAlbum(Long id, AlbumRequestDTO albumRequestDTO) {
    Album album = albumRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Álbum não encontrado com o ID: " + id));

    User user = userRepository.findById(albumRequestDTO.getUserId())
        .orElseThrow(
            () -> new EntityNotFoundException("Usuário não encontrado com o ID: " + albumRequestDTO.getUserId()));

    album.setTitle(albumRequestDTO.getTitle());
    album.setUser(user);

    return albumRepository.save(album);
  }

  public void deleteAlbum(Long id) {
    if (!albumRepository.existsById(id)) {
      throw new EntityNotFoundException("Álbum não encontrado com o ID: " + id);
    }
    albumRepository.deleteById(id);
  }
}