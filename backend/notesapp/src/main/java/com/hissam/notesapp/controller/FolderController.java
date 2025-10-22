package com.hissam.notesapp.controller;

import com.hissam.notesapp.dto.FolderRequest;
import com.hissam.notesapp.dto.FolderResponse;
import com.hissam.notesapp.service.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/folders")
@RequiredArgsConstructor
public class FolderController {
    
    private final FolderService folderService;
    
    @GetMapping
    public ResponseEntity<List<FolderResponse>> getUserFolders(Authentication authentication) {
        List<FolderResponse> folders = folderService.getUserFolders(authentication.getName());
        return ResponseEntity.ok(folders);
    }
    
    @PostMapping
    public ResponseEntity<FolderResponse> createFolder(
            Authentication authentication,
            @Valid @RequestBody FolderRequest request) {
        FolderResponse response = folderService.createFolder(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/{folderId}")
    public ResponseEntity<FolderResponse> updateFolder(
            Authentication authentication,
            @PathVariable Long folderId,
            @Valid @RequestBody FolderRequest request) {
        FolderResponse response = folderService.updateFolder(authentication.getName(), folderId, request);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{folderId}")
    public ResponseEntity<Map<String, String>> deleteFolder(
            Authentication authentication,
            @PathVariable Long folderId) {
        folderService.deleteFolder(authentication.getName(), folderId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Folder deleted successfully");
        return ResponseEntity.ok(response);
    }
}