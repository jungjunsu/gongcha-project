package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.RecruitRequest;
import com.b306.gongcha.dto.response.RecruitResponse;
import com.b306.gongcha.dto.response.UserRecruitResponse;
import com.b306.gongcha.entity.UserRecruit;

import java.util.List;

public interface RecruitService {

    List<RecruitResponse> getAllRecruits();
    RecruitResponse getRecruit(Long recruitId);
    RecruitRequest createRecruit(RecruitRequest recruitRequest);
    RecruitRequest updateRecruit(Long recruitId, RecruitRequest recruitRequest);
    Long deleteRecruit(Long recruitId);
    // 선수 구직 신청 요청
    UserRecruitResponse requestRecruit(Long recruitId, Long userId);
    // 신청한 사람 기준 신청 내역 조회
    List<UserRecruitResponse> getUserRecruitByUser(Long userId);
    // 신청 받은 사람 기준 신청 내역 조회
    List<UserRecruitResponse> getUserRecruitByRecruit(Long recruitId);
    // 신청 내역 상세 조회
    UserRecruitResponse getUserRecruit(Long recruitId, Long userId);
    // 선수 구직 신청 승인
    UserRecruitResponse acceptRecruit(Long recruitId, Long userId);
    // 선수 구직 신청 거절
    Long rejectRecruit(Long recruitId, Long userId);
}
