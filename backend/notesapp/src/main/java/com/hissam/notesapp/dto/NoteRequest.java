package com.hissam.notesapp.dto;

import com.hissam.notesapp.enums.NoteType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NoteRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String content;
    private NoteType noteType = NoteType.REGULAR;
    private Long folderId;
    private String tags;
    private Boolean completed = false;
}