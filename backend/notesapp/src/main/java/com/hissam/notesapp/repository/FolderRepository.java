package com.hissam.notesapp.repository;

import com.hissam.notesapp.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long>{
    List<Folder> findByChildId(Long childId);
}
