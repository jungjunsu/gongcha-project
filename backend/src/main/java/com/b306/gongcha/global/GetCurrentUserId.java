package com.b306.gongcha.global;

import com.b306.gongcha.dto.response.CustomOAuth2User;
import com.b306.gongcha.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Slf4j
public class GetCurrentUserId {

    private final UserRepository userRepository;

    private final SecretKey secretKey;

    public GetCurrentUserId(UserRepository userRepository, @Value("${spring.jwt.secret}") String secret) {
        this.userRepository = userRepository;
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }
    public static Long currentUserId() {
        // SecurityContext에서 Authentication 객체 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = null;

        // 사용자의 아이디 번호 가져오기
        if (authentication != null && authentication.isAuthenticated()) {
            CustomOAuth2User userDetails = (CustomOAuth2User) authentication.getPrincipal();
            userId = userDetails.getUserId();
            System.out.println("userId = " + userId);
        }
        return userId;
    }

}
