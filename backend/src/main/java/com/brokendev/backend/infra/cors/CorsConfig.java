package com.brokendev.backend.infra.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // alterar ao ter porta do front.
                .allowedMethods("GET", "POST", "DELETE", "PUT");

        registry.addMapping("/swagger-ui/**").allowedOrigins("*");
        registry.addMapping("/v3/api-docs/**").allowedOrigins("*");
    }
}
