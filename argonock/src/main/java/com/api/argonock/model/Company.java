package com.api.argonock.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
  private String name = "";
  private String catchPhrase = "";
  private String bs = "";
}
