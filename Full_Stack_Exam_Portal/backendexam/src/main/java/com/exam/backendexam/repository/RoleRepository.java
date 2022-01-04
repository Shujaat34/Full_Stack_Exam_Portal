package com.exam.backendexam.repository;

import com.exam.backendexam.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    Role getRoleByRoleName(String name);
}
