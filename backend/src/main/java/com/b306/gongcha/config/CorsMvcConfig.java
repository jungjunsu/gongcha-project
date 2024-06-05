package com.b306.gongcha.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**")
                .exposedHeaders("Authorization", "Set-Cookie")
                .allowedOrigins("http://localhost:5173",
                                "http://localhost:5173/kakao/callback",
                                "http://k10b306.p.ssafy.io:5173",
                                "http://k10b306.p.ssafy.io:8081",
                                "https://gongcha.site");
    }
}
