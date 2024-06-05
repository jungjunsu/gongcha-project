package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.UserNameRequest;
import com.b306.gongcha.dto.response.NoticeBoxResponse;
import com.b306.gongcha.dto.response.ProfileResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    String updateProfile(MultipartFile file, HttpServletRequest request);
    List<NoticeBoxResponse> getNotices(HttpServletRequest request);

    void updateUserName(HttpServletRequest request, UserNameRequest dto);

    void duplicateName(HttpServletRequest request, UserNameRequest dto);

    ProfileResponse getMyProfile(HttpServletRequest request);

    ProfileResponse getUserProfile(Long userId);
}
