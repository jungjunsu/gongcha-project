package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.ClubMakeRequest;
import com.b306.gongcha.dto.response.ClubInfoResponse;
import com.b306.gongcha.dto.response.ClubUserResponse;
import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.CardRepository;
import com.b306.gongcha.repository.ClubRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ClubService {

    private final FileUploadService fileUploadService;
    private final JWTUtil jwtUtil;
    private final CardRepository cardRepository;
    private final ClubRepository clubRepository;

    @Transactional
    public void createClub(HttpServletRequest httpServletRequest, ClubMakeRequest clubMakeRequest) {

        // 클럽 생성
        Club club = Club.fromRequest(clubMakeRequest);

        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);

        // 이미 클럽에 있는 사용자인지 확인
        if (user.getClubRole() == null) {
            club.addClubUser(user);

            // 유저의 클럽 여부 변경
            user.changeClub(club);

            // 유저의 권한 ( 마스터 ) 로 설정
            user.changeRole(ClubRole.MASTER);

            // 클럽의 마스터 설정
            club.changeMaster(user.getName());

            clubRepository.save(club);
        } else {
            throw new CustomException(ErrorCode.ALREADY_EXIST_USER_IN_CLUB);
        }

    }

    @Transactional(readOnly = true)
    public Page<ClubInfoResponse> getAllClubs(Pageable pageable) {

        Page<Club> clubs = clubRepository.findAll(pageable);
        return clubs.map(ClubInfoResponse::fromEntity);
    }

    public void deleteClub(HttpServletRequest request, Long clubId) {

        User user = jwtUtil.getUserFromAccessToken(request);

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));
        // 유저의 클럽과 역할이 맞는지 체크
        if (user.getClub() == club && user.getClubRole() == ClubRole.MASTER) {
            for (User findUser : club.getClubUser()) {
                findUser.deleteClub();
            }
            user.deleteClub();
            user.changeRole(null);
            club.getClubUser().clear();
            clubRepository.delete(club);
        }

    }

    public ClubInfoResponse clubDetail(Long clubId) {

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));

        return ClubInfoResponse.fromEntity(club);
    }

    public List<ClubUserResponse> getClubUsers(Long clubId) {

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));

        return ClubUserResponse.from(club, cardRepository);
    }

    public String updateLogo(HttpServletRequest request, Long clubId, MultipartFile file) {

        User user = jwtUtil.getUserFromAccessToken(request);
        /**
         * 1. 접속한 유저가 클럽에 속해있고 클럽마스터 권한이 있는지 체크
         * 2. 유저가 클럽마스터면 클럽에 대한 이미지 삭제 및 업로드
         */

        if (user.getClub().getId().equals(clubId) && user.getClubRole() == ClubRole.MASTER) {
            // logo 가 null 이나 empty 가 아니면, delete 우선 처리
            Club userClub = user.getClub();
            if (!(userClub.getLogo() == null || userClub.getLogo().isEmpty())) {
                fileUploadService.delete(userClub.getLogo());
            }

            String logoURL = fileUploadService.save("club/", file);
            userClub.updateLogo(logoURL);

            clubRepository.save(userClub);

            return logoURL;
        } else {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
    }

    public ClubInfoResponse getMyClub(HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);

        Long clubId = user.getClub().getId();

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));

        return ClubInfoResponse.fromEntity(club);
    }
}
