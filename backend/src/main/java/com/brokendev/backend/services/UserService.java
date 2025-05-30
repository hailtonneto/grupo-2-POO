package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.login.LoginRequestDTO;
import com.brokendev.backend.dto.login.LoginResponseDTO;
import com.brokendev.backend.dto.register.RegisterRequestDTO;
import com.brokendev.backend.dto.register.RegisterResponseDTO;
import com.brokendev.backend.infra.security.TokenService;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class    UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AccountRepository accountRepository;

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
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setName(request.name());
        user.setCpf(request.cpf());
        user.setTelephone(request.telephone());
        repository.save(user);

        Account account = new Account();
        account.setUser(user);
        account.setBalance(BigDecimal.ZERO);
        account.setAccountNumber(generateAccountNumber());
        accountRepository.save(account);

        return new RegisterResponseDTO(user.getName(), user.getEmail(), "Registrado com sucesso!");
    }

    private String generateAccountNumber() {
        return String.valueOf(System.currentTimeMillis());
    }
}
