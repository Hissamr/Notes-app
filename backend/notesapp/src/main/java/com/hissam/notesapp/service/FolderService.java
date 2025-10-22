package com.hissam.notesapp.service;

import com.hissam.notesapp.dto.FolderRequest;
import com.hissam.notesapp.dto.FolderResponse;
import com.hissam.notesapp.entity.Child;
import com.hissam.notesapp.entity.Folder;
import com.hissam.notesapp.entity.User;
import com.hissam.notesapp.enums.UserRole;
import com.hissam.notesapp.exception.ResourceNotFoundException;
import com.hissam.notesapp.exception.UnauthorizedException;
import com.hissam.notesapp.repository.ChildRepository;
import com.hissam.notesapp.repository.FolderRepository;
import com.hissam.notesapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FolderService {
    
    private final FolderRepository folderRepository;
    private final ChildRepository childRepository;
    private final UserRepository userRepository;
    
    public List<FolderResponse> getUserFolders(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (user.getRole() != UserRole.CHILD) {
            throw new UnauthorizedException("Only children can access folders");
        }
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        return folderRepository.findByChildId(child.getId())
                .stream()
                .map(this::mapToFolderResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public FolderResponse createFolder(String username, FolderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (user.getRole() != UserRole.CHILD) {
            throw new UnauthorizedException("Only children can create folders");
        }
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        Folder folder = new Folder();
        folder.setName(request.getName());
        folder.setChild(child);
        
        folder = folderRepository.save(folder);
        return mapToFolderResponse(folder);
    }
    
    @Transactional
    public FolderResponse updateFolder(String username, Long folderId, FolderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        
        if (!folder.getChild().getId().equals(child.getId())) {
            throw new UnauthorizedException("Folder does not belong to user");
        }
        
        folder.setName(request.getName());
        folder = folderRepository.save(folder);
        
        return mapToFolderResponse(folder);
    }
    
    @Transactional
    public void deleteFolder(String username, Long folderId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        
        if (!folder.getChild().getId().equals(child.getId())) {
            throw new UnauthorizedException("Folder does not belong to user");
        }
        
        folderRepository.delete(folder);
    }
    
    private FolderResponse mapToFolderResponse(Folder folder) {
        return FolderResponse.builder()
                .id(folder.getId())
                .name(folder.getName())
                .childId(folder.getChild().getId())
                .createdAt(folder.getCreatedAt())
                .build();
    }
}