package com.hissam.notesapp.repository;

import com.hissam.notesapp.entity.Child;
import com.hissam.notesapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    Optional<Child> findByUser(User user);
    Optional<Child> findByUserId(Long userId);
    List<Child> findByParentId(Long parentId);
}
