package com.b306.gongcha.util;

import com.b306.gongcha.dto.response.CustomOAuth2User;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.RefreshTokenRepository;
import com.b306.gongcha.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@Slf4j
public class JWTUtil {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final SecretKey secretKey;


    public JWTUtil(@Value("${spring.jwt.secret}") String secret, UserRepository userRepository
                   , RefreshTokenRepository refreshTokenRepository) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    // JWT 페이로드에 들어있는 값 확인 메서드
    public String getUserInfo(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userInfo", String.class);
    }

    public Long getUserId(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId", Long.class);
    }

    public String getRole(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public String getCategory(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }


    /**
     * 1. getUserFromAccessToken 을 통해서 AccessToken 조회
     * 2. validateUser 를 통해서 유저의 유효성 조회
     */
    @Transactional
    public User getUserFromAccessToken(HttpServletRequest request) {
        if (null == request.getHeader("Authorization")) {
            throw new CustomException(ErrorCode.BLANK_TOKEN_HEADER);
        }

        return validateUser(request);
    }

    @Transactional
    public User validateUser(HttpServletRequest request) {
        String tokenFromHeader = request.getHeader("Authorization");
        if (!validateToken(tokenFromHeader)) {
            throw new CustomException(ErrorCode.INVALID_TOKEN);
        }

        // 유저 정보 조회
        User user = getUserFromAuthentication();

        // REFRESHTOKEN 유무 조회
        isPresentRefreshToken(user);

        return user;
    }

    public boolean validateToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT signature, 유효하지 않는 JWT 서명 입니다.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token, 만료된 JWT token 입니다.");
            throw new CustomException(ErrorCode.EXPIRED_TOKEN);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token, 지원되지 않는 JWT 토큰 입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT claims is empty, 잘못된 JWT 토큰 입니다.");
        }
        return false;
    }

    public User getUserFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || AnonymousAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
            throw new CustomException(ErrorCode.NOT_FOUND_AUTHENTICATION);
        }
        Long userId = ((CustomOAuth2User) authentication.getPrincipal()).getUserId();
        return userRepository.findById(userId)
                .orElseThrow(()->new CustomException(ErrorCode.NOT_FOUND_ID));
    }

    @Transactional(readOnly = true)
    public void isPresentRefreshToken(User user) {

        refreshTokenRepository.findById(user.getId())
                .orElseThrow(()->new CustomException(ErrorCode.NOT_FOUND_TOKEN));
    }
    public String createJwt(Long userId, String category, String userInfo, String role, Long expiredMs) {
        // 서버 디폴트 시간대 설정

        System.out.println("생성 시간 = " + new Date(System.currentTimeMillis()));
        System.out.println("만료 시간 = " + new Date(System.currentTimeMillis() + expiredMs));
        // JWT 생성
        return Jwts.builder()
                .claim("category", category)
                .claim("userId", userId)
                .claim("userInfo", userInfo)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

}
