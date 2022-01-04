package com.exam.backendexam.service.impl;

import com.exam.backendexam.exception.GenericException;
import com.exam.backendexam.model.User;
import com.exam.backendexam.model.UserRole;
import com.exam.backendexam.repository.RoleRepository;
import com.exam.backendexam.repository.UserRepository;
import com.exam.backendexam.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRole) {
        User newUser = null;
        User userExist = userRepository.findByUsername(user.getUsername());
        if (userExist != null) {
            try {
                throw new GenericException("User Already Exist");
            } catch (Exception e) {
                log.info("User Already Exist " + e.getMessage());
            }
        } else {
            user.setProfile("Default.png");
            for (UserRole ur : userRole) {
                roleRepository.save(ur.getRole());
                user.getUserRoles().addAll(userRole);
                newUser = userRepository.save(user);
            }
        }
        return newUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Map<String, String> deleleById(Long id) {
        Map<String, String> msg = new HashMap<>();
        userRepository.deleteById(id);
        msg.put("response", "User Deleted");
        return msg;
    }


    @Override
    public User updateUser(User user, Set<UserRole> userRole) {
        User newUser = null;
        User userExist = userRepository.findByUsername(user.getUsername());
        if (userExist == null) {
            try {
                throw new GenericException("User Not Found");
            } catch (Exception e) {
                System.out.println("User Not Found " + e.getMessage());
            }
        } else {
            for (UserRole ur : userRole) {
                roleRepository.save(ur.getRole());
                user.getUserRoles().addAll(userRole);
                newUser = userRepository.save(user);
            }
        }
        return newUser;
    }
}
