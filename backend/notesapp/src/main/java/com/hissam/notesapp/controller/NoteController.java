package com.hissam.notesapp.controller;

import com.hissam.notesapp.dto.NoteRequest;
import com.hissam.notesapp.dto.NoteResponse;
import com.hissam.notesapp.service.NoteService;
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
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    
    private final NoteService noteService;
    
    @GetMapping
    public ResponseEntity<List<NoteResponse>> getUserNotes(Authentication authentication) {
        List<NoteResponse> notes = noteService.getUserNotes(authentication.getName());
        return ResponseEntity.ok(notes);
    }
    
    @PostMapping
    public ResponseEntity<NoteResponse> createNote(
            Authentication authentication,
            @Valid @RequestBody NoteRequest request) {
        NoteResponse response = noteService.createNote(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/{noteId}")
    public ResponseEntity<NoteResponse> updateNote(
            Authentication authentication,
            @PathVariable Long noteId,
            @Valid @RequestBody NoteRequest request) {
        NoteResponse response = noteService.updateNote(authentication.getName(), noteId, request);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{noteId}")
    public ResponseEntity<Map<String, String>> deleteNote(
            Authentication authentication,
            @PathVariable Long noteId) {
        noteService.deleteNote(authentication.getName(), noteId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Note deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/child/{childId}")
    public ResponseEntity<List<NoteResponse>> getChildNotes(
            Authentication authentication,
            @PathVariable Long childId) {
        List<NoteResponse> notes = noteService.getChildNotes(authentication.getName(), childId);
        return ResponseEntity.ok(notes);
    }
}