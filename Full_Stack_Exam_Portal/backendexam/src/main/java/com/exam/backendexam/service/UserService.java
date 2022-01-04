package com.exam.backendexam.service;

import com.exam.backendexam.model.User;
import com.exam.backendexam.model.UserRole;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface UserService {
    User createUser(User user, Set<UserRole> userRole);
    User updateUser(User user, Set<UserRole> userRole);
    List<User> getAllUsers();
    User getUserByUsername(String username);
    Map<String,String> deleleById(Long id);

}
