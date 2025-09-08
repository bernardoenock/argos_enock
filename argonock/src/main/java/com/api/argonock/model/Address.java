package com.api.argonock.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
  private String street = "";
  private String suite = "";
  private String city = "";
  private String zipcode = "";

  @Embedded
  private Geo geo = new Geo(); // 🔹 inicializando para evitar nulos
}
