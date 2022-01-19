package com.exam.backendexam;

import com.exam.backendexam.config.FileStorageProperties;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
@Slf4j
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class BackendexamApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BackendexamApplication.class);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("server.port");
        String contextPath = env.getProperty("server.servlet.context-path");
        if (StringUtils.isBlank(contextPath)) {
            contextPath = "/";
        }
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info("\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! Access URLs:\n\t" +
                        "Local:\t\t\t{}://localhost:{}{}\n\t" +
                        "External:\t\t{}://{}:{}{}\n\t" +
                        "Profile(s):\t{}\n" +
                        "----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol,
                serverPort,
                contextPath,
                protocol,
                hostAddress,
                serverPort,
                contextPath,
                env.getActiveProfiles()
        );
    }


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner run(UserService userService, RoleRepository roleRepository) {
        return args -> {
            //Admin Role
            Role roleAdmin = new Role();
            roleAdmin.setRoleName("ADMIN");
            roleRepository.save(roleAdmin);

            //User Role
            Role roleNormal = new Role();
            roleNormal.setRoleName("NORMAL");
            roleRepository.save(roleNormal);

            //Admin Creation
            User userAdmin = new User();
            userAdmin.setUsername("bukhari");
            userAdmin.setPassword(passwordEncoder.encode("bukhari123"));
            userAdmin.setFirstName("Syed Shujaat");
            userAdmin.setLastName("Bukhari");
            userAdmin.setEmail("bukhari@gmail.com");
            userAdmin.setPhone("03069440399");
            userAdmin.setProfile("default.png");
            userAdmin.setEnabled(true);

            Set<UserRole> userRolesSetAdmin = new HashSet<>();
            UserRole userRoleAdmin = new UserRole();
            userRoleAdmin.setRole(roleAdmin);
            userRoleAdmin.setUser(userAdmin);
            userRolesSetAdmin.add(userRoleAdmin);
            userAdmin.setUserRoles(userRolesSetAdmin);

            userService.createUser(userAdmin, userRolesSetAdmin);

            //User Creation
            User userNormal = new User();
            userNormal.setUsername("jameel");
            userNormal.setPassword(passwordEncoder.encode("jameel123"));
            userNormal.setFirstName("Jameel Khan");
            userNormal.setLastName("Khakeli");
            userNormal.setEmail("jameeli@gmail.com");
            userNormal.setPhone("03032520332");
            userNormal.setProfile("default.png");
            userNormal.setEnabled(true);

            Set<UserRole> userRolesSetNormal = new HashSet<>();
            UserRole userRoleNormal = new UserRole();
            userRoleNormal.setRole(roleNormal);
            userRoleNormal.setUser(userNormal);
            userRolesSetNormal.add(userRoleNormal);
            userAdmin.setUserRoles(userRolesSetNormal);

            userService.createUser(userNormal, userRolesSetNormal);

        };

    }

}
