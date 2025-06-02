package com.brokendev.backend.services;

import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.login.LoginRequestDTO;
import com.brokendev.backend.dto.login.LoginResponseDTO;
import com.brokendev.backend.dto.register.RegisterRequestDTO;
import com.brokendev.backend.dto.register.RegisterResponseDTO;
import com.brokendev.backend.exception.InvalidPasswordException;
import com.brokendev.backend.exception.UserAlreadyExistsException;
import com.brokendev.backend.infra.security.TokenService;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setName("Test User");
        user.setEmail("test@email.com");
        user.setPassword("encodedPassword");
        user.setCpf("12345678900");
        user.setTelephone("999999999");
    }

    // Login - cenário de sucesso
    @Test
    void login_givenValidCredentials_whenUserExists_thenReturnLoginResponse() {
        // GIVEN
        LoginRequestDTO request = new LoginRequestDTO("test@email.com", "senha123");
        when(repository.findByEmail("test@email.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("senha123", "encodedPassword")).thenReturn(true);
        when(tokenService.generateToken(user)).thenReturn("token123");

        // WHEN
        LoginResponseDTO response = userService.login(request);

        // THEN
        assertThat(response.name()).isEqualTo("Test User");
        assertThat(response.email()).isEqualTo("test@email.com");
        assertThat(response.token()).isEqualTo("token123");
    }

    // Login - usuário não encontrado
    @Test
    void login_givenNonexistentUser_whenLoginAttempted_thenThrowUsernameNotFoundException() {
        // GIVEN
        LoginRequestDTO request = new LoginRequestDTO("notfound@email.com", "senha123");
        when(repository.findByEmail("notfound@email.com")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThatThrownBy(() -> userService.login(request))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessage("User not found");
    }

    // Login - senha inválida
    @Test
    void login_givenInvalidPassword_whenLoginAttempted_thenThrowInvalidPasswordException() {
        // GIVEN
        LoginRequestDTO request = new LoginRequestDTO("test@email.com", "senhaErrada");
        when(repository.findByEmail("test@email.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("senhaErrada", "encodedPassword")).thenReturn(false);

        // WHEN & THEN
        assertThatThrownBy(() -> userService.login(request))
                .isInstanceOf(InvalidPasswordException.class)
                .hasMessage("Invalid password");
    }

    // Registro - sucesso
    @Test
    void register_givenValidRequest_whenEmailNotExists_thenReturnRegisterResponse() {
        // GIVEN
        RegisterRequestDTO request = new RegisterRequestDTO("Novo User", "12345678900", "novo@email.com", "password-user", "888888888");
        when(repository.findByEmail(any(String.class))).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password-user")).thenReturn("encodedSenha");
        when(repository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // WHEN
        RegisterResponseDTO response = userService.register(request);

        // THEN
        assertThat(response.name()).isEqualTo("Novo User");
        assertThat(response.email()).isEqualTo("novo@email.com");
        assertThat(response.message()).isEqualTo("Registrado com sucesso!");
    }

    // Registro - email já existe
    @Test
    void register_givenExistingEmail_whenRegisterAttempted_thenThrowUserAlreadyExistsException() {
        // GIVEN
        RegisterRequestDTO request = new RegisterRequestDTO("Novo User", "12345678900", "test@email.com", "senha", "888888888");
        when(repository.findByEmail(any(String.class))).thenReturn(Optional.of(user));

        // WHEN & THEN
        assertThatThrownBy(() -> userService.register(request))
                .isInstanceOf(UserAlreadyExistsException.class)
                .hasMessage("Email already registered");
    }
}