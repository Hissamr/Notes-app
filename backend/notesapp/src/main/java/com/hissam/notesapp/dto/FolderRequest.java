package com.hissam.notesapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FolderRequest {
    @NotBlank(message = "Folder name is required")
    private String name;
}
