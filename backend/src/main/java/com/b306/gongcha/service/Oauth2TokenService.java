package com.b306.gongcha.service;

import com.b306.gongcha.dto.response.AccessResponse;
import com.b306.gongcha.dto.response.UserInfoResponse;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.RefreshTokenRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Oauth2TokenService {

    private final JWTUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;

    public AccessResponse regenerateAccessToken(HttpServletRequest request, HttpServletResponse response) {

        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
                System.out.println("refresh = " + refresh);
            }
        }

        if (refresh == null) {
            //response status code
            throw new CustomException(ErrorCode.NOT_FOUND_TOKEN);
        }

        // refresh 토큰의 만료 검사
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            // 만료된 토큰
            throw new CustomException(ErrorCode.EXPIRED_TOKEN);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {
            // 불분명한 토큰
            throw new CustomException(ErrorCode.INVALID_TOKEN);
        }

        String userInfo = jwtUtil.getUserInfo(refresh);
        System.out.println("토큰 재발급을 위한 userInfo = " + userInfo);
        String role = jwtUtil.getRole(refresh);
        Long userId = jwtUtil.getUserId(refresh);

        // 들어온 refresh 가 redis 에 들어있는 refresh 인지 검사
        boolean isExist = refreshTokenRepository.existsById(userId);
        if(!isExist) {
            throw new CustomException(ErrorCode.NOT_FOUND_TOKEN);
        }

        // 새로운 JWT 토큰 발행
        String newAccess = jwtUtil.createJwt(userId, "access", userInfo, role, 60 * 60 * 1000L);
        String newRefresh = jwtUtil.createJwt(userId, "refresh", userInfo, role, 60 * 60 * 24L * 1000);

        // 기존 redis 에 있는 refresh 삭제 후 신규 토큰 저장
        refreshTokenService.deleteRefreshToken(userId);
        refreshTokenService.addRefreshToken(userId, newRefresh);

        // 응답
        response.addCookie(createCookie("refresh", newRefresh));

        response.setStatus(HttpStatus.OK.value());
        return AccessResponse.builder()
                .AccessToken(newAccess)
                .build();
    }

    public UserInfoResponse getUserInfo(HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);

        return UserInfoResponse.fromEntity(user);
    }

    public UserInfoResponse getUserInfoById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        return UserInfoResponse.fromEntity(user);
    }


    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*24);
        cookie.setPath("/");
        // httpOnly 가 true 면, 클라이언트에서 조회가 불가능해짐
        cookie.setHttpOnly(false);

        return cookie;
    }

}
