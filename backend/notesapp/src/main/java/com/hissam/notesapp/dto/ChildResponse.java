package com.hissam.notesapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChildResponse {
    private Long id;
    private Long userId;
    private String username;
    private String email;
}
