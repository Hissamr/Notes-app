package com.hissam.notesapp.repository;


import com.hissam.notesapp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByChildId(Long childId);
    List<Note> findByChildIdAndFolderId(Long childId, Long folderId);
    List<Note> findByChildIdAndFolderIsNull(Long childId);
}
