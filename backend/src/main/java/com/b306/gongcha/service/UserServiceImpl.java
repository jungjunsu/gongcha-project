package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.UserNameRequest;
import com.b306.gongcha.dto.response.NoticeBoxResponse;
import com.b306.gongcha.dto.response.ProfileResponse;
import com.b306.gongcha.entity.Notice;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.NoticeRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;
    private final NoticeRepository noticeRepository;
    private final JWTUtil jwtUtil;

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getMyProfile(HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);
        return ProfileResponse.fromEntity(user.getProfile());
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getUserProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        return ProfileResponse.fromEntity(user.getProfile());
    }

    @Override
    @Transactional
    public String updateProfile(MultipartFile file, HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);
        if(!(user.getProfile() == null || user.getProfile().isEmpty())) {
            fileUploadService.delete(user.getProfile());
        }

        String profileURL = fileUploadService.save("user/", file);
        user.updateProfile(profileURL);

        return profileURL;
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoticeBoxResponse> getNotices(HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);
        List<Notice> notice = noticeRepository.findAllByToUserId(user.getId());
        return NoticeBoxResponse.fromEntity(notice);
    }

    @Override
    @Transactional
    public void updateUserName(HttpServletRequest request, UserNameRequest dto) {

        // 변경하려는 닉네임이 현재 닉네임과 같은지 확인
        User user = jwtUtil.getUserFromAccessToken(request);
        if(user.getName().equals(dto.getName())){
            throw new CustomException(ErrorCode.SAME_AS_CURRENT_USER_NAME);
        }

        // 변경하려는 닉네임이 이미 존재하는지 확인
        List<User> check = userRepository.findAllByName(dto.getName());
        if(!check.isEmpty()){
            throw new CustomException(ErrorCode.DUPLICATE_USER_NAME);
        }

        // 해당 닉네임으로 변경
        user.updateName(dto.getName());
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public void duplicateName(HttpServletRequest request, UserNameRequest dto) {

        List<User> user = userRepository.findAllByName(dto.getName());
        if (!user.isEmpty()){
            throw new CustomException(ErrorCode.DUPLICATE_USER_NAME);
        }
    }
}
