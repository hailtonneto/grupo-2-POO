package com.brokendev.backend.services;

import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.LoginRequestDTO;
import com.brokendev.backend.dto.LoginResponseDTO;
import com.brokendev.backend.dto.RegisterRequestDTO;
import com.brokendev.backend.dto.RegisterResponseDTO;
import com.brokendev.backend.exception.UserAlreadyExistsException;
import com.brokendev.backend.infra.security.TokenService;
import com.brokendev.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = repository.findByEmail(request.email())
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));

        if(!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String token = tokenService.generateToken(user);
        return new LoginResponseDTO(user.getName(), user.getEmail(), token);
    }

    public RegisterResponseDTO register(RegisterRequestDTO request) {
        if(repository.findByEmail(request.email()).isPresent()) {
            throw new UserAlreadyExistsException("Email already registered");
        }
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setName(request.name());
        user.setCpf(request.cpf());
        user.setTelephone(request.telephone());
        repository.save(user);

        return new RegisterResponseDTO(user.getName(), user.getEmail(), "Registrado com sucesso!");
    }
}
