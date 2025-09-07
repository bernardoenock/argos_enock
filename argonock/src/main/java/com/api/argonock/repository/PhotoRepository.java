package com.api.argonock.repository;

import com.api.argonock.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

  List<Photo> findByAlbumId(Long albumId);
}