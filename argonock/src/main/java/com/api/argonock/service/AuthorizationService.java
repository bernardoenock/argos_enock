package com.api.argonock.service;

import com.api.argonock.model.User;
import com.api.argonock.model.UserRole;
import com.api.argonock.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AuthorizationService implements UserDetailsService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthorizationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = findByEmail(email);
    return new CustomUserDetails(user);
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
  }

  public User saveUser(String email, String password, UserRole role) {
    String encryptedPassword = passwordEncoder.encode(password);
    User newUser = new User(email, encryptedPassword, role);
    return userRepository.saveAndFlush(newUser);
  }

  public static class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
      this.user = user;
    }

    public User getUser() {
      return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return user.getAuthorities();
    }

    @Override
    public String getPassword() {
      return user.getPassword();
    }

    @Override
    public String getUsername() {
      return user.getEmail();
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
}
