package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.RecruitRequest;
import com.b306.gongcha.dto.response.RecruitResponse;
import com.b306.gongcha.dto.response.UserRecruitResponse;
import com.b306.gongcha.entity.Recruit;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.UserRecruit;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.RecruitRepository;
import com.b306.gongcha.repository.UserRecruitRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService {

    private final RecruitRepository recruitRepository;
    private final UserRecruitRepository userRecruitRepository;
    private final UserRepository userRepository;

    // 선수 구인 게시글 전체 조회
    @Override
    public List<RecruitResponse> getAllRecruits() {

        List<RecruitResponse> recruitResponseList = new ArrayList<>();
        List<Recruit> recruitList = recruitRepository.findAll();
        // 전체 리스트 조회 후 RecruitResponse List 형태로 반환
        recruitList.forEach(r -> recruitResponseList.add(r.toRecruitResponse()));
        return recruitResponseList;
    }

    // 선수 구인 게시글 상세 조회
    @Override
    public RecruitResponse getRecruit(Long recruitId) {

        // 조회 실패 시 해당 게시글 조회 실패 에러 반환
        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        return recruit.toRecruitResponse();
    }

    // 선수 구인 게시글 작성
    @Override
    public RecruitRequest createRecruit(RecruitRequest recruitRequest) {

        Recruit recruit = recruitRequest.toRecruit();
        Recruit savedRecruit = recruitRepository.save(recruit);
        // RecruitRequest에서 Writer id 정보를 가져오기
        User writer = userRepository.findById(recruitRequest.getWriterId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // 비어있는 dummy user 사용 - id=0인 dummy user
        User emptyUser = userRepository.findById(0L).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // Service에서 emptyUser 생성 시 연관관계 오류 발생 + 실제로는 프로그램 시작시에만 필요
        // 현재 방법: MySQL에서 id=0인 비어있는 dummy user 생성
//        if(emptyUser == null) {
//            emptyUser = User.builder().id(0L).build();
//            userRepository.save(emptyUser);
//        }
        // 작성자 정보를 UserRecruit에 저장
        UserRecruit userRecruit = UserRecruit.builder()
                .writerUser(writer)
                .user(emptyUser)
                .recruit_permit(false)
                .recruit(savedRecruit)
                .build();
        userRecruitRepository.save(userRecruit);

        return recruitRequest;
    }

    // 선수 구인 게시글 수정
    @Override
    public RecruitRequest updateRecruit(Long recruitId, RecruitRequest recruitRequest) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        recruit.updateRecruit(recruitRequest);
        return recruitRequest;
    }

    // 선수 구인 게시글 삭제
    @Override
    public Long deleteRecruit(Long recruitId) {

        if(recruitRepository.findById(recruitId).isPresent()) {
            // 게시글에 대한 신청 정보 삭제 - Cascade 변경 예정
//            userRecruitRepository.deleteAllByRecruitId(recruitId);
            // 게시글 삭제
            recruitRepository.deleteById(recruitId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        return recruitId;
    }

    // 선수 구인 게시글 구인 신청
    @Override
    public UserRecruitResponse requestRecruit(Long recruitId, Long userId) {

        // 게시글 정보, 신청자 정보, 작성자 정보 받아오기
        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        User writer = userRecruitRepository.findByRecruitIdAndUserId(recruitId, 0L)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)).getWriterUser();
        // 신청자 관련 예외 처리
        if(user.getId().equals(writer.getId())) { // 작성자와 신청자가 동일한 경우
            throw new CustomException(ErrorCode.BOARD_REQUEST_FAIL);
        } else if (userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).isPresent()) { // 이미 동일 게시판에 신청한 경우
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        UserRecruit userRecruit = UserRecruit.builder()
                .writerUser(writer)
                .user(user)
                .recruit(recruit)
                .recruit_permit(false)
                .build();
        return userRecruitRepository.save(userRecruit).toUserRecruitResponse();
    }

    // 신청자 번호로 해당 유저의 신청 내역 조회
    @Override
    public List<UserRecruitResponse> getUserRecruitByUser(Long userId) {

        List<UserRecruitResponse> userRecruitResponseList = new ArrayList<>();
        List<UserRecruit> userRecruitList = userRecruitRepository.findAllByUserId(userId);
        userRecruitList.forEach(ur -> userRecruitResponseList.add(ur.toUserRecruitResponse()));
        return userRecruitResponseList;
    }

    // 게시글 번호로 해당 게시글이 받은 신청 내역 조회
    @Override
    public List<UserRecruitResponse> getUserRecruitByRecruit(Long recruitId) {

        List<UserRecruitResponse> userRecruitResponseList = new ArrayList<>();
        List<UserRecruit> userRecruitList = userRecruitRepository.findAllByRecruitId(recruitId);
        userRecruitList.forEach(ur -> userRecruitResponseList.add(ur.toUserRecruitResponse()));
        return userRecruitResponseList;
    }

    // 게시글 번호와 신청자 번호로 해당 게시글에 신청한 유저 내역 조회 - 신청 여부 반환을 위해 Boolean return 하도록 바꿀 예정
    @Override
    public UserRecruitResponse getUserRecruit(Long recruitId, Long userId) {

        return userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST)).toUserRecruitResponse();
    }

    // 선수 구인 게시글 구인 신청 승인
    @Override
    public UserRecruitResponse acceptRecruit(Long recruitId, Long userId) {

        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userRecruit.acceptRecruit();
        // 승인 시 현재 유저 수 1 증가
        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        recruit.updateCurrentPlayers();
        return userRecruit.toUserRecruitResponse();
    }

    // 선수 구인 게시글 구인 신청 거절
    @Override
    public Long rejectRecruit(Long recruitId, Long userId) {

        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userRecruitRepository.deleteById(userRecruit.getId());
        return recruitId;
    }

}
