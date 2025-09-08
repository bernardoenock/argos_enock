package com.api.argonock.dto;

import com.api.argonock.model.Address;
import com.api.argonock.model.Company;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {

  @NotBlank
  private String name;

  @NotBlank
  private String username;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String password;

  private String phone;
  private String website;

  @Valid
  private Address address;

  @Valid
  private Company company;
}
