package com.b306.gongcha.oauth2;

import com.b306.gongcha.dto.response.CustomOAuth2User;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.service.RefreshTokenService;
import com.b306.gongcha.util.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

    // 로그인을 통해서 jwt 토큰을 발급하고, 발급된 jwt token을 5173번 포트로 쿠키에 담아서 전달한다.
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        // jwt를 만들 때, role과 username을 claim해서 만들었기 때문에 값을 넘겨줘야함
        String userInfo = customUserDetails.getUserInfo();
        Long userId = customUserDetails.getUserId();
//        Long userId = userRepository.findByUserInfo(userInfo).getId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String access = jwtUtil.createJwt(userId, "access", userInfo, role, 60 * 60 * 1000L); // 1시간
        String refresh = jwtUtil.createJwt(userId, "refresh", userInfo, role, 60 * 60 * 24L * 1000); // 하루

        // refresh 토큰 저장
        User byUserInfo = userRepository.findByUserInfo(userInfo);
        System.out.println("토큰 첫 저장 userInfo = " + byUserInfo);
        refreshTokenService.addRefreshToken(byUserInfo.getId(), refresh);

        response.setHeader("Authorization", access);
//        response.addCookie(createCookie("Authorization", access));
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
        response.sendRedirect("https://gongcha.site/main");

//        Map<String, Object> map = new LinkedHashMap<>();
//        map.put("code", HttpStatus.OK);
//        map.put("message", "login success");
//        map.put("accessToken", access);
//        map.put("refreshToken", refresh);
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.setStatus(HttpStatus.OK.value());
//        response.getWriter().write(new ObjectMapper().writeValueAsString(map));
//        response.sendRedirect("http://localhost:5173/main");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*24);
        cookie.setHttpOnly(false);
        cookie.setPath("/");

        return cookie;
    }
}

/**
 * 하이퍼링크로 프론트한테 JWT 토큰을 보내줌.
 * 로그인에 대한 책임을 모두 백엔드가 가짐.
 * 그래서 프론트로 내보낼 때, 토큰에 대한 값 처리를 cookie로 내보내는게 일반적
 */
