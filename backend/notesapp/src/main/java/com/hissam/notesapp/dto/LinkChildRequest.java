package com.hissam.notesapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LinkChildRequest {
    @NotBlank(message = "Child username is required")
    private String childUsername;
}
