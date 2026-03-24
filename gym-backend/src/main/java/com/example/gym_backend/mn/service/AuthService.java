package com.example.gym_backend.mn.service;

import com.example.gym_backend.mn.dto.AuthResponse;
import com.example.gym_backend.mn.dto.LoginRequest;
import com.example.gym_backend.mn.dto.OtpVerifyRequest;
import com.example.gym_backend.mn.dto.RegisterRequest;
import com.example.gym_backend.mn.model.AppUser;
import com.example.gym_backend.mn.model.UserRole;
import com.example.gym_backend.mn.repository.AppUserRepository;
import com.example.gym_backend.mn.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final Map<String, String> otpMap = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> otpExpiryMap = new ConcurrentHashMap<>();
    private final Map<String, Boolean> otpVerifiedMap = new ConcurrentHashMap<>();

    public AuthService(
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public Map<String, String> register(RegisterRequest req) {
        String email = req.email().toLowerCase();
        userRepository.findByEmail(req.email()).ifPresent(u -> {
            throw new RuntimeException("Email already registered");
        });

        if (!otpVerifiedMap.getOrDefault(email, false)) {
            throw new RuntimeException("Verify OTP before registration");
        }

        AppUser user = new AppUser();
        user.setName(req.name());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(UserRole.ROLE_USER);
        userRepository.save(user);

        otpMap.remove(email);
        otpExpiryMap.remove(email);
        otpVerifiedMap.remove(email);
        return Map.of("message", "Registration successful");
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email().toLowerCase(), req.password())
        );

        AppUser user = userRepository.findByEmail(req.email().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token,
                new AuthResponse.UserSummary(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getSubscriptionStatus()
                ));
    }

    public Map<String, String> sendOtp(String email) {
        String normalized = email.toLowerCase();

        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpMap.put(normalized, otp);
        otpExpiryMap.put(normalized, LocalDateTime.now().plusMinutes(10));
        otpVerifiedMap.put(normalized, false);

        System.out.println("Maruti Nandan OTP for " + email + ": " + otp);
        return Map.of("message", "OTP sent successfully");
    }

    public Map<String, String> verifyOtp(OtpVerifyRequest req) {
        String email = req.email().toLowerCase();
        String otp = otpMap.get(email);
        LocalDateTime expiry = otpExpiryMap.get(email);

        if (otp == null || expiry == null || expiry.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        if (!otp.equals(req.otp())) {
            throw new RuntimeException("Invalid OTP");
        }

        otpVerifiedMap.put(email, true);

        return Map.of("message", "OTP verified");
    }
}
