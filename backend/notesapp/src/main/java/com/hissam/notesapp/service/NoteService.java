package com.hissam.notesapp.service;

import com.hissam.notesapp.dto.NoteRequest;
import com.hissam.notesapp.dto.NoteResponse;
import com.hissam.notesapp.entity.Child;
import com.hissam.notesapp.entity.Folder;
import com.hissam.notesapp.entity.Note;
import com.hissam.notesapp.entity.User;
import com.hissam.notesapp.enums.UserRole;
import com.hissam.notesapp.exception.ResourceNotFoundException;
import com.hissam.notesapp.exception.UnauthorizedException;
import com.hissam.notesapp.repository.ChildRepository;
import com.hissam.notesapp.repository.FolderRepository;
import com.hissam.notesapp.repository.NoteRepository;
import com.hissam.notesapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    
    private final NoteRepository noteRepository;
    private final ChildRepository childRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    
    public List<NoteResponse> getUserNotes(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (user.getRole() != UserRole.CHILD) {
            throw new UnauthorizedException("Only children can access their notes");
        }
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        return noteRepository.findByChildId(child.getId())
                .stream()
                .map(this::mapToNoteResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public NoteResponse createNote(String username, NoteRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (user.getRole() != UserRole.CHILD) {
            throw new UnauthorizedException("Only children can create notes");
        }
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setNoteType(request.getNoteType());
        note.setChild(child);
        note.setTags(request.getTags());
        note.setCompleted(request.getCompleted());
        
        if (request.getFolderId() != null) {
            Folder folder = folderRepository.findById(request.getFolderId())
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
            
            if (!folder.getChild().getId().equals(child.getId())) {
                throw new UnauthorizedException("Folder does not belong to user");
            }
            note.setFolder(folder);
        }
        
        note = noteRepository.save(note);
        return mapToNoteResponse(note);
    }
    
    @Transactional
    public NoteResponse updateNote(String username, Long noteId, NoteRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));
        
        if (!note.getChild().getId().equals(child.getId())) {
            throw new UnauthorizedException("Note does not belong to user");
        }
        
        if (request.getTitle() != null) {
            note.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            note.setContent(request.getContent());
        }
        if (request.getNoteType() != null) {
            note.setNoteType(request.getNoteType());
        }
        if (request.getTags() != null) {
            note.setTags(request.getTags());
        }
        if (request.getCompleted() != null) {
            note.setCompleted(request.getCompleted());
        }
        if (request.getFolderId() != null) {
            Folder folder = folderRepository.findById(request.getFolderId())
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
            note.setFolder(folder);
        }
        
        note = noteRepository.save(note);
        return mapToNoteResponse(note);
    }
    
    @Transactional
    public void deleteNote(String username, Long noteId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Child child = childRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found"));
        
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));
        
        if (!note.getChild().getId().equals(child.getId())) {
            throw new UnauthorizedException("Note does not belong to user");
        }
        
        noteRepository.delete(note);
    }
    
    public List<NoteResponse> getChildNotes(String parentUsername, Long childId) {
        User parent = userRepository.findByUsername(parentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found"));
        
        if (parent.getRole() != UserRole.PARENT) {
            throw new UnauthorizedException("Only parents can view child notes");
        }
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new ResourceNotFoundException("Child not found"));
        
        if (child.getParent() == null || !child.getParent().getId().equals(parent.getId())) {
            throw new UnauthorizedException("Child does not belong to parent");
        }
        
        return noteRepository.findByChildId(childId)
                .stream()
                .map(this::mapToNoteResponse)
                .collect(Collectors.toList());
    }
    
    private NoteResponse mapToNoteResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .noteType(note.getNoteType())
                .childId(note.getChild().getId())
                .folderId(note.getFolder() != null ? note.getFolder().getId() : null)
                .tags(note.getTags())
                .completed(note.getCompleted())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build();
    }
}