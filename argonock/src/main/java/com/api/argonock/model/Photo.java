package com.api.argonock.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "photos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Photo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String url;
  private String thumbnailUrl;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "album_id", nullable = false)
  private Album album;
}