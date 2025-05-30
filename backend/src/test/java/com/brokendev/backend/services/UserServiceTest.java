package com.brokendev.backend.services;

import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.login.LoginRequestDTO;
import com.brokendev.backend.dto.login.LoginResponseDTO;
import com.brokendev.backend.dto.register.RegisterRequestDTO;
import com.brokendev.backend.dto.register.RegisterResponseDTO;
import com.brokendev.backend.exception.UserAlreadyExistsException;
import com.brokendev.backend.infra.security.TokenService;
import com.brokendev.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

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

    @Test
    void loginComSucesso() {
        LoginRequestDTO request = new LoginRequestDTO("test@email.com", "senha123");
        when(repository.findByEmail("test@email.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("senha123", "encodedPassword")).thenReturn(true);
        when(tokenService.generateToken(user)).thenReturn("token123");

        LoginResponseDTO response = userService.login(request);

        assertEquals("Test User", response.name());
        assertEquals("test@email.com", response.email());
        assertEquals("token123", response.token());
    }

    @Test
    void loginUsuarioNaoEncontrado() {
        LoginRequestDTO request = new LoginRequestDTO("notfound@email.com", "senha123");
        when(repository.findByEmail("notfound@email.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.login(request));
    }

    @Test
    void loginSenhaInvalida() {
        LoginRequestDTO request = new LoginRequestDTO("test@email.com", "senhaErrada");
        when(repository.findByEmail("test@email.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("senhaErrada", "encodedPassword")).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> userService.login(request));
    }

    @Test
    void registerComSucesso() {
        RegisterRequestDTO request = new RegisterRequestDTO("Novo User", "12345678900", "novo@email.com", "password-user", "888888888");
        // Ajuste: stub genérico para qualquer e-mail
        when(repository.findByEmail(any(String.class))).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password-user")).thenReturn("encodedSenha");
        when(repository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        RegisterResponseDTO response = userService.register(request);

        assertEquals("Novo User", response.name());
        assertEquals("novo@email.com", response.email());
        assertEquals("Registrado com sucesso!", response.message());
    }

    @Test
    void registerEmailJaExiste() {
        RegisterRequestDTO request = new RegisterRequestDTO("Novo User", "test@email.com", "senha", "12345678900", "888888888");
        // Ajuste: stub genérico para qualquer e-mail
        when(repository.findByEmail(any(String.class))).thenReturn(Optional.of(user));

        assertThrows(UserAlreadyExistsException.class, () -> userService.register(request));
    }
}
