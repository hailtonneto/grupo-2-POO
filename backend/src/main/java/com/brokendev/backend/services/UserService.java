package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.account.AccountInfoResponseDTO;
import com.brokendev.backend.dto.card.CardResponseDTO;
import com.brokendev.backend.dto.login.LoginRequestDTO;
import com.brokendev.backend.dto.login.LoginResponseDTO;
import com.brokendev.backend.dto.profile.UserProfileResponseDTO;
import com.brokendev.backend.dto.profile.UserProfileUpdateDTO;
import com.brokendev.backend.dto.profile.UserProfileUpdateResponseDTO;
import com.brokendev.backend.dto.register.RegisterRequestDTO;
import com.brokendev.backend.dto.register.RegisterResponseDTO;
import com.brokendev.backend.exception.AccountNotFoundException;
import com.brokendev.backend.exception.InvalidPasswordException;
import com.brokendev.backend.exception.UserAlreadyExistsException;
import com.brokendev.backend.infra.security.TokenService;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.CardRepository;
import com.brokendev.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import static com.brokendev.backend.utils.AccountUtils.generateAccountNumber;
import static com.brokendev.backend.utils.CardUtils.maskCardNumber;

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

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CardService cardService;

    @Autowired
    private UserRepository userRepository;

    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = repository.findByEmail(request.email())
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));

        if(!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new InvalidPasswordException("Invalid password");
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

        Account account = new Account();
        account.setUser(user);
        account.setBalance(BigDecimal.ZERO);
        account.setAccountNumber(generateAccountNumber());
        accountRepository.save(account);

        return new RegisterResponseDTO(user.getName(), user.getEmail(), "Registrado com sucesso!");
    }

    public UserProfileResponseDTO getProfile(User user) {
        Account account = accountRepository.findByUserEmail(user.getEmail())
                .orElseThrow(() -> new AccountNotFoundException("Conta não encontrada"));

        var cards = cardRepository.findByAccount(account)
                .stream()
                .map(card -> new CardResponseDTO(
                        card.getId(),
                        maskCardNumber(card.getCardNumber()),
                        card.getHolderName(),
                        card.getExpiration(),
                        card.isBlocked(),
                        card.getCreatedAt()
                ))
                .toList();

        return new UserProfileResponseDTO(
                user.getName(),
                user.getEmail(),
                user.getCpf(),
                user.getTelephone(),
                new AccountInfoResponseDTO(account.getId(), account.getBalance()),
                cards
        );
    }

    @Transactional
    public UserProfileUpdateResponseDTO updateProfile(Long userId, UserProfileUpdateDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (dto.name() != null) user.setName(dto.name());
        if (dto.telephone() != null) user.setTelephone(dto.telephone());
        if (dto.email() != null) user.setEmail(dto.email());

        userRepository.save(user);

        return new UserProfileUpdateResponseDTO(
                user.getName(),
                user.getEmail(),
                user.getTelephone()
        );
    }
}
