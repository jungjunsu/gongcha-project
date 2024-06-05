package com.b306.gongcha.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@OpenAPIDefinition(
        info = @Info(
                title = "[GongCha] API 명세서",
                description = "REST API",
                version = "1.0.0"
        )
)

@Configuration
public class swaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        String accessTokenKey = "Authorization";
        String refreshTokenKey = "RefreshToken";

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList(accessTokenKey)
                .addList(refreshTokenKey);

        SecurityScheme accessTokenSecurityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name(HttpHeaders.AUTHORIZATION);

        SecurityScheme refreshTokenSecurityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.COOKIE)
                .name(refreshTokenKey);

        Components components = new Components()
                .addSecuritySchemes(accessTokenKey, accessTokenSecurityScheme)
                .addSecuritySchemes(refreshTokenKey, refreshTokenSecurityScheme);

        return new OpenAPI()
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
