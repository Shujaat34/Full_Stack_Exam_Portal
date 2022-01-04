package com.exam.backendexam.controller;

import com.exam.backendexam.model.Role;
import com.exam.backendexam.model.User;
import com.exam.backendexam.model.UserRole;
import com.exam.backendexam.service.RoleService;
import com.exam.backendexam.service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin("*")
@RestController
@Api(tags = "User Api")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @PostMapping("/")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setProfile("default.png");

//        Role role = new Role();
//        role.setRoleName("ADMIN");
        Role role = roleService.getRoleByName("NORMAL");

        //bukhari - ADMIN
        //bukhari123 - Password

        //jameel - NORMAL
        //jameel123 - Password

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        Set<UserRole> userRoleSet = new HashSet<>();
        userRoleSet.add(userRole);

        return new ResponseEntity<>(userService.createUser(user, userRoleSet), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, String>> getUserByUserId(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(userService.deleleById(userId), HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<User> updateUser(@RequestBody User user, @RequestBody Set<UserRole> userRoles) {
        return new ResponseEntity<>(userService.updateUser(user, userRoles), HttpStatus.OK);
    }
}
