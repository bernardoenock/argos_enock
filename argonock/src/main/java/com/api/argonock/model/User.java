package com.api.argonock.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(generator = "uuid2")
  @org.hibernate.annotations.UuidGenerator
  @Column(updatable = false, nullable = false)
  private String id;

  private String name = "";

  @Column(unique = true)
  private String username = "";

  @Column(unique = true)
  private String email = "";

  private String password = "";
  private String phone = "";
  private String website = "";

  @Enumerated(EnumType.STRING)
  private UserRole role = UserRole.USER;

  @Embedded
  private Address address = new Address();

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "name", column = @Column(name = "company_name")),
      @AttributeOverride(name = "catchPhrase", column = @Column(name = "company_catch_phrase")),
      @AttributeOverride(name = "bs", column = @Column(name = "company_bs"))
  })
  private Company company = new Company();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Todo> todos = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Album> albums = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Post> posts = new ArrayList<>();

  public User(String email, String password, UserRole role) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = "";
    this.username = email;
    this.phone = "";
    this.website = "";
    this.address = new Address();
    this.company = new Company();
    this.todos = new ArrayList<>();
    this.albums = new ArrayList<>();
    this.posts = new ArrayList<>();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    if (this.role == UserRole.ADMIN) {
      return List.of(
          new SimpleGrantedAuthority("ROLE_ADMIN"),
          new SimpleGrantedAuthority("ROLE_USER"));
    } else {
      return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
