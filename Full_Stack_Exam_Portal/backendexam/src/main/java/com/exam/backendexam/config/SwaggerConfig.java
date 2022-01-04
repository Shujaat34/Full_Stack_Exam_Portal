package com.exam.backendexam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket actionSwaggerApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("E-2-E Api's").tags(
                        new Tag("User Api", "Repository for Users"),
                        new Tag("Category Api", "Repository for Categories of a Quiz "),
                        new Tag("Athentication Api", "Repository for Athentication "),
                        new Tag("Question Api", "Repository for Questions "),
                        new Tag("Quiz Api", "Repository for Quiz ")
                )
                .apiInfo(apiInfo()).select().apis(RequestHandlerSelectors.basePackage("com.exam.backendexam")).
                paths(regex("/.*")).build().pathMapping("/");

    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("E-2-E Role Permission Module")
                .description("Swagger Integration Role Permission Module")
                .termsOfServiceUrl(null)
                .license(null)
                .licenseUrl(null).version("1.0").build();
    }
}
