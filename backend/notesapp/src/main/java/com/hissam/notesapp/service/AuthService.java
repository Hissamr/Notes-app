package com.hissam.notesapp.service;

import com.hissam.notesapp.dto.*;
import com.hissam.notesapp.entity.Child;
import com.hissam.notesapp.entity.User;
import com.hissam.notesapp.enums.UserRole;
import com.hissam.notesapp.exception.ResourceNotFoundException;
import com.hissam.notesapp.repository.ChildRepository;
import com.hissam.notesapp.repository.UserRepository;
import com.hissam.notesapp.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        
        user = userRepository.save(user);
        
        if (request.getRole() == UserRole.CHILD) {
            Child child = new Child();
            child.setUser(user);
            childRepository.save(child);
        }
        
        return mapToUserResponse(user);
    }
    
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);
        
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
    
    @Transactional
    public void linkChild(String parentUsername, String childUsername) {
        User parent = userRepository.findByUsername(parentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found"));
        
        if (parent.getRole() != UserRole.PARENT) {
            throw new RuntimeException("User is not a parent");
        }
        
        User childUser = userRepository.findByUsername(childUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Child user not found"));
        
        if (childUser.getRole() != UserRole.CHILD) {
            throw new RuntimeException("User is not a child");
        }
        
        Child child = childRepository.findByUser(childUser)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        child.setParent(parent);
        childRepository.save(child);
    }
    
    public UserResponse getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }
    
    public java.util.List<ChildResponse> getLinkedChildren(String parentUsername) {
        User parent = userRepository.findByUsername(parentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found"));
        
        if (parent.getRole() != UserRole.PARENT) {
            throw new RuntimeException("User is not a parent");
        }
        
        return childRepository.findByParentId(parent.getId())
                .stream()
                .map(this::mapToChildResponse)
                .collect(java.util.stream.Collectors.toList());
    }
    
    @Transactional
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with this email not found"));
        
        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
        
        userRepository.save(user);
        
        // In a real application, you would send an email here with the reset link
        // For now, we'll just log it or return it
        System.out.println("Password reset token for " + email + ": " + resetToken);
        System.out.println("Reset link: http://localhost:3000/reset-password?token=" + resetToken);
    }
    
    @Transactional
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired reset token"));
        
        // Check if token is expired
        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        
        userRepository.save(user);
    }
    
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
    
    private ChildResponse mapToChildResponse(Child child) {
        return ChildResponse.builder()
                .id(child.getId())
                .userId(child.getUser().getId())
                .username(child.getUser().getUsername())
                .email(child.getUser().getEmail())
                .build();
    }
}