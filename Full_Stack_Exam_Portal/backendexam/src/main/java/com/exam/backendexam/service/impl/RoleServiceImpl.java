package com.exam.backendexam.service.impl;

import com.exam.backendexam.model.Role;
import com.exam.backendexam.repository.RoleRepository;
import com.exam.backendexam.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.getRoleByRoleName(name);
    }
}
