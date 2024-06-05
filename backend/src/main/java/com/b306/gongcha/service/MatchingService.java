package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.MatchingAskRequest;
import com.b306.gongcha.dto.request.MatchingRequest;
import com.b306.gongcha.dto.response.CardResponse;
import com.b306.gongcha.dto.response.MatchingAskResponse;
import com.b306.gongcha.dto.response.MatchingResponse;
import com.b306.gongcha.entity.*;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.*;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MatchingService {

    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    private final MatchingRepository matchingRepository;
    private final MatchingAskRepository matchingAskRepository;
    private final TransferRepository transferRepository;

    private final JWTUtil jwtUtil;


    // 매칭 게시판에서 팀장인지 확인
    public Long getTeamId(Long userId) {

        List<UserTeam> userTeamList = userTeamRepository.findAllByUserIdAndRole(userId, Role.valueOf("팀장"));
        Long teamId = 0L;
        for(UserTeam u : userTeamList) {
            // 모집완료 상태인 팀 1개만 찾기
            if(u.getTeam().getStatus() == Status.valueOf("모집완료")) {
                teamId = u.getTeam().getId();
                break;
            }
        }
        if(teamId != 0L) {
            return teamId;
        }
        else {
            throw new CustomException(ErrorCode.NO_AUTHORITY_MANAGER);
        }
    }

    // 매칭 게시판 작성
    @Transactional
    public void createMatching(HttpServletRequest httpServletRequest, MatchingRequest matchingRequest) {

        // 현재 유저 정보 가져오기
        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();
        // 현재 유저의 팀 중 "모집완료" 상태인 팀 id 가져오기
        matchingRequest.updateMatchingTeamId(getTeamId(userId));
        Matching matching = Matching.fromRequest(matchingRequest);
        matchingRepository.save(matching);

        // 팀 게시판의 상태 매칭중으로 변경하기
        Team team = teamRepository.findById(getTeamId(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        team.updateStatus(Status.valueOf("매칭중"));
        teamRepository.save(team);
    }

    // 매칭 게시판 전체 조회
    @Transactional(readOnly = true)
    public Page<MatchingResponse> getAllMatchings(Pageable pageable) {

        Page<Matching> matchings = matchingRepository.findAll(pageable);
        Page<MatchingResponse> matchingResponses = matchings.map(MatchingResponse::fromEntity);

        for(MatchingResponse mr : matchingResponses) {
            // 팀 이름(팀장 이름) 가져오기
            userTeamRepository.findByTeamIdAndRole(mr.getMatchingTeamId(), Role.valueOf("팀장"))
                    .ifPresent(userTeam -> mr.updateCaptainName(userTeam.getUser().getName()));

            // 팀 소속 인원 수 가져오기
            Long teamId = mr.getMatchingTeamId();
            List<UserTeam> userTeamList = userTeamRepository.findAllByTeamIdAndPermitIsTrue(teamId);
            mr.updatePlayerNum(userTeamList.size());

            // 팀 로고 가져오기
            mr.updateTeamPic(mr.getTeamPic());
        }

        return matchingResponses;
    }

    // 매칭 게시판 상세 조회
    @Transactional(readOnly = true)
    public MatchingResponse getMatching(Long matchingId) {

        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        MatchingResponse matchingResponse = MatchingResponse.fromEntity(matching);

        // 팀 이름(팀장 이름) 가져오기
        userTeamRepository.findByTeamIdAndRole(matchingResponse.getMatchingTeamId(), Role.valueOf("팀장"))
                .ifPresent(userTeam -> matchingResponse.updateCaptainName(userTeam.getUser().getName()));

        // 팀 소속 인원 수 가져오기
        Long teamId = matchingResponse.getMatchingTeamId();
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamIdAndPermitIsTrue(teamId);
        matchingResponse.updatePlayerNum(userTeamList.size());

        // 팀 로고 가져오기
        matchingResponse.updateTeamPic(matchingResponse.getTeamPic());

        return matchingResponse;
    }

    // 매칭 게시판 정보 수정
    public MatchingResponse updateMatching(Long matchingId, MatchingRequest matchingRequest) {

        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        matching.updateMatching(matchingRequest);
        return MatchingResponse.fromEntity(matching);
    }

    // 매칭 게시판 정보 삭제
    public void deleteMatching(Long matchingId) {

        if(matchingRepository.findById(matchingId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_MATCHING);
        }
        else {
            matchingRepository.deleteById(matchingId);
        }
    }

    // 매칭 신청하기
    @Transactional
    public void requestMatching(Long matchingId, HttpServletRequest httpServletRequest) {

        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();
        Long versusTeamId = getTeamId(userId);

        // 신청하는 팀의 존재 여부 확인
        if(teamRepository.findById(versusTeamId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
        else {
            MatchingAskRequest matchingAskRequest = new MatchingAskRequest(versusTeamId, false);
            MatchingAsk matchingAsk = MatchingAsk.fromRequest(matchingAskRequest);
            matchingAsk.updateMatching(matchingRepository.findById(matchingId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING)));
            matchingAskRepository.save(matchingAsk);
        }

    }

    // 게시판 작성한 팀이 받은 신청 목록 조회
    @Transactional(readOnly = true)
    public List<MatchingAskResponse> getAllMatchingAsks(Long matchingTeamId) {

        List<MatchingAskResponse> matchingAskResponseList = new ArrayList<>();
        List<MatchingAsk> matchingAskList = matchingAskRepository.findByMatchingTeamIdAndPermitIsFalse(matchingTeamId);
        matchingAskList.forEach(ma -> matchingAskResponseList.add(MatchingAskResponse.fromEntity(ma)));
        return matchingAskResponseList;
    }

    // 게시판 작성한 팀장이 받은 신청 목록 조회
    @Transactional(readOnly = true)
    public List<MatchingAskResponse> getAllMatchingAsksByUserId(HttpServletRequest httpServletRequest) {

        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();
        Long teamId = getTeamId(userId);
        List<MatchingAskResponse> matchingAskResponseList = new ArrayList<>();
        List<MatchingAsk> matchingAskList = matchingAskRepository.findByMatchingTeamIdAndPermitIsFalse(teamId);
        matchingAskList.forEach(ma -> matchingAskResponseList.add(MatchingAskResponse.fromEntity(ma)));
        return matchingAskResponseList;
    }

    // 신청 승인된 매칭 목록 조회
    @Transactional(readOnly = true)
    public List<MatchingAskResponse> getAcceptedMatchingList(HttpServletRequest httpServletRequest) {

        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();

        // 유저 id로 매칭완료 상태인 팀 id 가져오기
        List<UserTeam> userTeamList = userTeamRepository.findAllByUserId(userId);
        Long teamId = 0L;
        for(UserTeam u : userTeamList) {
            // 매칭완료 상태인 팀 1개만 찾기
            if(u.getTeam().getStatus() == Status.valueOf("매칭완료")) {
                teamId = u.getTeam().getId();
                break;
            }
        }

        List<MatchingAskResponse> matchingAskResponseList = new ArrayList<>();
        List<MatchingAsk> matchingAskList = matchingAskRepository.findByMatchingTeamIdAndPermitIsTrue(teamId);
        matchingAskList.forEach(ma -> matchingAskResponseList.add(MatchingAskResponse.fromEntity(ma)));
        return matchingAskResponseList;
    }

    // 받은 신청 승인
    public void acceptMatching(Long matchingTeamId, Long versusTeamId) {

        // 신청 정보 확인
        MatchingAsk matchingAsk = matchingAskRepository.findByMatchingTeamIdAndVersusTeamId(matchingTeamId, versusTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        // 신청 정보 승인 여부 확인
        if(matchingAsk.getPermit()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        else {
            // 매칭 승인 됨
            matchingAsk.updatePermit(true);
            matchingAskRepository.save(matchingAsk);

            // 매칭 게시판 상태 "매칭완료"로 변경
            Long matchingId = matchingAsk.getMatching().getId();
            Matching matching = matchingRepository.findById(matchingId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
            matching.updateStatus(Status.valueOf("매칭완료"));
            matchingRepository.save(matching);

            // 팀 게시판의 상태 매칭완료로 변경하기
            Team team = teamRepository.findById(matchingTeamId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
            team.updateStatus(Status.valueOf("매칭완료"));
            teamRepository.save(team);

            // 상대팀도 동일하게 매칭완료로 변경
            Team versusTeam = teamRepository.findById(versusTeamId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
            versusTeam.updateStatus(Status.valueOf("매칭완료"));
            teamRepository.save(versusTeam);
        }
    }

    // 받은 신청 거절
    public void rejectMatching(Long matchingTeamId, Long versusTeamId) {

        // 신청 정보 확인
        MatchingAsk matchingAsk = matchingAskRepository.findByMatchingTeamIdAndVersusTeamId(matchingTeamId, versusTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        matchingAskRepository.delete(matchingAsk);
    }

    // 상대팀 팀원 정보 목록 조회
    @Transactional(readOnly = true)
    public List<User> getVersusTeamUsers(Long matchingId) {

        Long versusTeamId = matchingAskRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM)).getVersusTeamId();
        if(teamRepository.findById(versusTeamId).isPresent()) {
            return userTeamRepository.findUsersByTeamId(versusTeamId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
    }

    // 상대팀 팀원 카드 목록 조회
    @Transactional(readOnly = true)
    public List<CardResponse> getVersusTeamCards(Long matchingId) {

        Long versusTeamId = matchingAskRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM)).getVersusTeamId();
        if(teamRepository.findById(versusTeamId).isPresent()) {
            List<Card> cardList = userTeamRepository.findCardsByTeamId(versusTeamId);
            return cardList.stream().map(CardResponse::fromEntity).toList();
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
    }

    // 매칭 상태 매칭종료 상태로 변경
    public void endMatching(Long matchingId) {

        // 매칭 게시판 상태 "매칭완료"로 변경
        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        matching.updateStatus(Status.valueOf("경기종료"));
        matchingRepository.save(matching);

        MatchingAsk matchingAsk = matchingAskRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));

        // 매칭 완료한 선수의 경기 수 1 증가
        Long matchingTeamId = matchingAsk.getMatching().getMatchingTeamId();
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamId(matchingTeamId);
        userTeamList.forEach(ut -> ut.getUser().addGames());

        // 이적시장에 카드 등록한 선수의 경우 팀 소속 여부 true -> false 변경
        userTeamList.forEach(ut -> transferRepository.findByUserId(ut.getUser().getId())
                .ifPresent(transfer -> transfer.updateJoin(false)));

        // 팀 게시판의 상태 매칭완료로 변경하기
        Team team = teamRepository.findById(matchingTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        team.updateStatus(Status.valueOf("경기종료"));
        teamRepository.save(team);

        // 매칭 완료한 상대팀의 경기 수 1 증가
        Long versusTeamId = matchingAsk.getVersusTeamId();
        List<UserTeam> versusUserTeamList = userTeamRepository.findAllByTeamId(versusTeamId);
        versusUserTeamList.forEach(ut -> ut.getUser().addGames());

        // 이적시장에 카드 등록한 선수의 경우 팀 소속 여부 true -> false 변경
        versusUserTeamList.forEach(ut -> transferRepository.findByUserId(ut.getUser().getId())
                .ifPresent(transfer -> transfer.updateJoin(false)));

        // 상대팀도 동일하게 매칭완료로 변경
        Team versusTeam = teamRepository.findById(versusTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        versusTeam.updateStatus(Status.valueOf("경기종료"));
        teamRepository.save(versusTeam);

    }

    // (매칭 시간 + 2시간)이 현재 시간보다 빠르면 매칭 종료 - @Scheduled로 1시간마다 실행
    @Scheduled(cron = "0 0 0/1 * * *")
    public void checkMatchingStatus() {

        List<Matching> matchingList = matchingRepository.findAll();
        for(Matching m : matchingList) {
            if(m.getStatus() == Status.valueOf("매칭완료")
                    && m.getDate().plusHours(2).isBefore(LocalDateTime.now())) {
                endMatching(m.getId());
            }
        }
    }

    // 유저의 경기 내역 조회
    @Transactional(readOnly = true)
    public List<MatchingAskResponse> getMatchingRecords(HttpServletRequest httpServletRequest) {

        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();
        List<MatchingAskResponse> matchingAskResponseList = new ArrayList<>();
        List<MatchingAsk> matchingAskList = matchingAskRepository.findAllByUserIdAndStatus(userId);
        matchingAskList.forEach(ma -> matchingAskResponseList.add(MatchingAskResponse.fromEntity(ma)));
        return matchingAskResponseList;
    }

}
