package com.b306.gongcha.config;

import com.b306.gongcha.oauth2.CustomSuccessHandler;
import com.b306.gongcha.repository.RefreshTokenRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.service.CustomLogoutService;
import com.b306.gongcha.service.CustomOauth2UserService;
import com.b306.gongcha.util.JWTFilter;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOauth2UserService customOauth2UserService;
    private final CustomSuccessHandler customSuccessHandler;
    private final RefreshTokenRepository refreshRepository;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final List<AntPathRequestMatcher> excludedPaths;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // cors 설정을 위해서, security cors와 mvcConfig에서의 cors 두 개 다 설정해줘야 한다.
        http.cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList("*"));
                configuration.setAllowedMethods(Arrays.asList("*"));
                configuration.setAllowCredentials(true);
                configuration.setAllowedHeaders(Arrays.asList("*"));
                configuration.setMaxAge(3600L);
                configuration.setExposedHeaders(Arrays.asList("Set-Cookie", "Authorization")); // 한 번만 호출하고 모든 노출해야 할 헤더를 포함시킵니다.
                return configuration;
            }
        }));
        //csrf disable
        http.csrf((auth) -> auth.disable());

        //From 로그인 방식 disable
        http.formLogin(formLogin -> formLogin.disable());

        //Form 로그아웃 방식 disable
//        http.logout((auth) -> auth.disable());

        // JWT Filter 안거칠 API
        List<AntPathRequestMatcher> excludedPaths = List.of(
                new AntPathRequestMatcher("/auth/regenerate"),
                new AntPathRequestMatcher("/club/clubs")
        );

        //HTTP Basic 인증 방식 disable
        http.httpBasic((auth) -> auth.disable());


        //JWTFilter 추가
        http.addFilterAfter(new JWTFilter(jwtUtil, excludedPaths), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(new CustomLogoutService(jwtUtil, refreshRepository, userRepository), LogoutFilter.class);

        //oauth2
        http.oauth2Login((oauth2) -> oauth2
                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                        .userService(customOauth2UserService))
                .successHandler(customSuccessHandler));

        //경로별 인가 작업
//        http.authorizeHttpRequests((auth) -> auth
//                .requestMatchers( "/","/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                .requestMatchers("/kakao/callback").permitAll()
//                .requestMatchers("/auth/regenerate").permitAll()
//                .requestMatchers("/google/callback").permitAll()
//                .requestMatchers("/club/clubs").permitAll()
//                .requestMatchers("/my").permitAll()
//                .requestMatchers("/reissue").permitAll()
//                .anyRequest().authenticated());

        http.authorizeHttpRequests((auth) -> auth.requestMatchers("/**").permitAll());



        //세션 설정 : STATELESS
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}

