package com.api.argonock.service;

import com.api.argonock.dto.PhotoRequestDTO;
import com.api.argonock.dto.PhotoResponseDTO;
import com.api.argonock.model.Album;
import com.api.argonock.model.Photo;
import com.api.argonock.repository.AlbumRepository;
import com.api.argonock.repository.PhotoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate; // Importar RestTemplate
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhotoService {

  @Autowired
  private PhotoRepository photoRepository;

  @Autowired
  private AlbumRepository albumRepository;

  // Bean do RestTemplate (pode ser configurado em uma classe de configuração
  // separada)
  private final RestTemplate restTemplate = new RestTemplate();

  // --- Métodos existentes (findAllPhotos, findPhotoById, createPhoto,
  // updatePhoto, deletePhoto) ---
  // (Não repetidos para brevidade, mas devem permanecer no código)

  public List<PhotoResponseDTO> findAllPhotos() {
    return photoRepository.findAll().stream()
        .map(PhotoResponseDTO::new)
        .collect(Collectors.toList());
  }

  public List<PhotoResponseDTO> findPhotosByAlbumId(Long albumId) {
    if (!albumRepository.existsById(albumId)) {
      throw new EntityNotFoundException("Álbum não encontrado com o ID: " + albumId);
    }
    return photoRepository.findByAlbumId(albumId).stream()
        .map(PhotoResponseDTO::new)
        .collect(Collectors.toList());
  }

  public PhotoResponseDTO findPhotoById(Long id) {
    Photo photo = photoRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Foto não encontrada com o ID: " + id));
    return new PhotoResponseDTO(photo);
  }

  public PhotoResponseDTO createPhoto(PhotoRequestDTO photoRequestDTO) {
    // Validação da URL antes de salvar
    validateImageUrl(photoRequestDTO.getUrl());

    Album album = albumRepository.findById(photoRequestDTO.getAlbumId())
        .orElseThrow(
            () -> new EntityNotFoundException("Álbum não encontrado com o ID: " + photoRequestDTO.getAlbumId()));

    Photo photo = new Photo();
    photo.setAlbum(album);
    photo.setTitle(photoRequestDTO.getTitle());
    photo.setUrl(photoRequestDTO.getUrl());
    photo.setThumbnailUrl(photoRequestDTO.getThumbnailUrl());

    Photo savedPhoto = photoRepository.save(photo);
    return new PhotoResponseDTO(savedPhoto);
  }

  public PhotoResponseDTO updatePhoto(Long id, PhotoRequestDTO photoRequestDTO) {
    Photo photo = photoRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Foto não encontrada com o ID: " + id));

    // Validação da URL antes de atualizar, se a URL foi alterada
    if (!photo.getUrl().equals(photoRequestDTO.getUrl())) {
      validateImageUrl(photoRequestDTO.getUrl());
    }

    if (!photo.getAlbum().getId().equals(photoRequestDTO.getAlbumId())) {
      Album newAlbum = albumRepository.findById(photoRequestDTO.getAlbumId())
          .orElseThrow(
              () -> new EntityNotFoundException("Álbum não encontrado com o ID: " + photoRequestDTO.getAlbumId()));
      photo.setAlbum(newAlbum);
    }

    photo.setTitle(photoRequestDTO.getTitle());
    photo.setUrl(photoRequestDTO.getUrl());
    photo.setThumbnailUrl(photoRequestDTO.getThumbnailUrl());

    Photo updatedPhoto = photoRepository.save(photo);
    return new PhotoResponseDTO(updatedPhoto);
  }

  public void deletePhoto(Long id) {
    if (!photoRepository.existsById(id)) {
      throw new EntityNotFoundException("Foto não encontrada com o ID: " + id);
    }
    photoRepository.deleteById(id);
  }
  // --- Fim dos métodos existentes ---

  /**
   * Valida se a URL da imagem é válida e acessível.
   * Verifica o formato da URL e tenta uma requisição HTTP HEAD para confirmar
   * acessibilidade.
   * 
   * @param imageUrl A URL da imagem a ser validada.
   * @throws IllegalArgumentException Se a URL for inválida ou inacessível.
   */
  private void validateImageUrl(String imageUrl) {
    if (imageUrl == null || imageUrl.trim().isEmpty()) {
      throw new IllegalArgumentException("A URL da imagem não pode ser nula ou vazia.");
    }

    // 1. Validação básica do formato da URL
    try {
      URI uri = new URI(imageUrl);
      if (!"http".equalsIgnoreCase(uri.getScheme()) && !"https".equalsIgnoreCase(uri.getScheme())) {
        throw new IllegalArgumentException("A URL da imagem deve usar os protocolos http ou https.");
      }
      if (uri.getHost() == null || uri.getHost().trim().isEmpty()) {
        throw new IllegalArgumentException("A URL da imagem deve conter um host válido.");
      }
    } catch (URISyntaxException e) {
      throw new IllegalArgumentException("Formato de URL inválido: " + imageUrl);
    }

    // 2. Validação de acessibilidade via requisição HEAD
    try {
      // Usamos uma requisição HEAD para verificar se o recurso existe sem baixar o
      // corpo da resposta
      ResponseEntity<Void> response = restTemplate.exchange(
          imageUrl,
          org.springframework.http.HttpMethod.HEAD,
          null, // Sem corpo na requisição HEAD
          Void.class);

      // Verifica se o status code indica sucesso (2xx)
      if (response.getStatusCode().isError()) {
        // Se não for um código de sucesso, lança uma exceção
        throw new IllegalArgumentException(
            "A imagem não está acessível ou não existe. Status code: " + response.getStatusCode());
      }
      // Se chegou aqui, a URL é válida e o recurso é acessível.
    } catch (HttpClientErrorException e) {
      // Captura erros específicos do cliente HTTP (ex: 404 Not Found, 403 Forbidden)
      throw new IllegalArgumentException(
          "Erro ao acessar a imagem: " + e.getStatusCode() + " - " + e.getMessage());
    } catch (Exception e) {
      // Captura outras exceções genéricas que podem ocorrer (ex: problemas de rede)
      throw new IllegalArgumentException(
          "Falha ao validar a URL da imagem: " + e.getMessage());
    }
  }
}