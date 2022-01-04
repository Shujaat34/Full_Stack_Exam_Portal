package com.exam.backendexam.controller;

import com.exam.backendexam.model.User;
import com.exam.backendexam.service.impl.UserDetailsServiceImpl;
import com.exam.backendexam.util.JwtRequest;
import com.exam.backendexam.util.JwtUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin("*")
@RestController
@Api(tags = "Athentication Api")
public class AuthenticateController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/generate-token")
    public ResponseEntity<String> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            throw new Exception("User Not Found " + e.getMessage());
        }

        //if username and password is correct
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(token);

    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("User is Disabled " + e.getMessage());
        } catch (BadCredentialsException e) {
            throw new Exception("Bad Credentials " + e.getMessage());
        }
    }

    //return Current User
    @ApiOperation(value = "Get Current User", response = ResponseEntity.class)
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        User user = (User) this.userDetailsService.loadUserByUsername(principal.getName());
        return user;
    }
}
