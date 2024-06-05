package com.b306.gongcha.util;

import com.b306.gongcha.dto.UserDTO;
import com.b306.gongcha.dto.response.CustomOAuth2User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final List<AntPathRequestMatcher> excludedPaths;

    public JWTFilter(JWTUtil jwtUtil, List<AntPathRequestMatcher> excludedPaths) {
        this.jwtUtil = jwtUtil;
        this.excludedPaths = excludedPaths;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        for (AntPathRequestMatcher excludedPath : excludedPaths) {
            if (excludedPath.matches(request)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        // 헤더에서 access키에 담긴 토큰을 꺼냄
        String accessToken = request.getHeader("Authorization");
        String trimAccessToken = "";

        // 토큰이 없다면 다음 필터로 넘김
        if (accessToken == null) {

            filterChain.doFilter(request, response);

            return;
        }

        // 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try {
            if (accessToken.startsWith("Bearer ")) {
                trimAccessToken = accessToken.substring(7);
            }
            jwtUtil.isExpired(trimAccessToken);
        } catch (ExpiredJwtException e) {

            //response body
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");

            //response status code
            throw new CustomException(ErrorCode.EXPIRED_TOKEN);
        }

        // 토큰이 access인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(trimAccessToken);

        if (!category.equals("access")) {

            //response body
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");

            //response status code
            throw new CustomException(ErrorCode.INVALID_TOKEN);
        }

        // 토큰에서 username과 role 획득
        String userInfo = jwtUtil.getUserInfo(trimAccessToken);
        String role = jwtUtil.getRole(trimAccessToken);
        Long userId = jwtUtil.getUserId(trimAccessToken);

        // userDTO를 생성하여 값 build
        UserDTO userDTO = UserDTO.builder()
                .userId(userId)
                .userInfo(userInfo)
                .role(role)
                .build();

        // userDetails에 회원 정보 객체 담기
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDTO);

        // 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        // 세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
