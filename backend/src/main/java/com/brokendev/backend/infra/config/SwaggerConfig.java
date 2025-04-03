package com.brokendev.backend.infra.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API - Bank App")
                        .description("Documentação da API do Bank App")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("BrokenDev")
                                .email("contatoluccasf9@gmail.com")
                        )
                )
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Servidor Local")
                        //new Server().url("https://api.brokendev.com").description("Servidor de Produção")
                ));
    }
}