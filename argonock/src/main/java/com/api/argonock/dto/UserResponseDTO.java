package com.api.argonock.dto;

import com.api.argonock.model.Address;
import com.api.argonock.model.Company;
import com.api.argonock.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
  private String id;
  private String name;
  private String username; // Mantido como username para consistência com outros DTOs, mas o valor aqui é o
                           // do UserDetails
  private String email;
  private Address address;
  private String phone;
  private String website;
  private Company company;

  public UserResponseDTO(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.username = user.getUsername(); // Corresponde ao 'username' do UserDetails (que é o email)
    this.email = user.getEmail();
    this.address = user.getAddress();
    this.phone = user.getPhone();
    this.website = user.getWebsite();
    this.company = user.getCompany();
  }
}