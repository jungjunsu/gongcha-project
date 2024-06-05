package com.b306.gongcha.service;

import com.b306.gongcha.dto.UserDTO;
import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.CardResponse;
import com.b306.gongcha.dto.response.TeamResponse;
import com.b306.gongcha.dto.response.UserTeamResponse;
import com.b306.gongcha.entity.*;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.NoticeRepository;
import com.b306.gongcha.repository.MatchingAskRepository;
import com.b306.gongcha.repository.TeamRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.repository.UserTeamRepository;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;
    private final MatchingAskRepository matchingAskRepository;

    private final JWTUtil jwtUtil;

    // 팀 목록 게시글 전체 조회
    @Override
    @Transactional(readOnly = true)
    public Page<TeamResponse> getAllTeams(Pageable pageable) {

        Page<Team> teams = teamRepository.findAll(pageable);
        Page<TeamResponse> teamResponses = teams.map(TeamResponse::fromEntity);

        teamResponses.forEach(t -> userTeamRepository.findByTeamIdAndRole(t.getId(), Role.valueOf("팀장"))
                .ifPresent(userTeam -> t.updateCaptainName(userTeam.getUser().getName())));
        return teamResponses;
    }

    // 팀 게시글 상세 조회
    @Override
    @Transactional(readOnly = true)
    public TeamResponse getTeam(Long teamId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        TeamResponse teamResponse = team.toTeamResponse();
        userTeamRepository.findByTeamIdAndRole(teamResponse.getId(), Role.valueOf("팀장"))
                .ifPresent(userTeam -> teamResponse.updateCaptainName(userTeam.getUser().getName()));
        return teamResponse;
    }

    // 승인된 팀원 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<UserTeamResponse> getTeamUsers(HttpServletRequest httpServletRequest, Long teamId) {

        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamIdAndPermitIsTrue(teamId);
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));

        // 경기수 세기
        userTeamResponseList.forEach( ut -> userRepository.findById(ut.getUserId())
                .ifPresent(user -> ut.updateGames(user.getGames())));

        // 팀장인 경우 전화번호 보여주기
        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();

        // 매니저 정보 가져오기
        Long managerId = 0L;
        UserTeam manager = userTeamRepository.findByTeamIdAndRole(teamId, Role.valueOf("팀장")).orElse(null);
        if(manager != null) {
            managerId = manager.getUser().getId();
        }

        // 현재 유저가 매니저인지 확인하기
        if(userId.equals(managerId)) {
            userTeamResponseList.forEach(utr -> userRepository.findById(utr.getUserId())
                    .ifPresent(currentUser -> utr.updatePhone(currentUser.getPhone())));
        }


        return userTeamResponseList;
    }

    // 팀 정보 생성
    @Override
    @Transactional
    public TeamResponse createTeam(TeamRequest teamRequest) {

        // 이미 "모집중" 상태인 팀의 팀장인 경우 팀 생성 불가능
        List<UserTeam> userTeamList = userTeamRepository.findAllByUserIdAndRole(teamRequest.getWriterId(), Role.valueOf("팀장"));
        boolean makeTeam = true;
        for(UserTeam ut : userTeamList) {
            Team team = teamRepository.findById(ut.getTeam().getId()).orElse(null);
            if(team != null) {
                if(team.getStatus().equals(Status.valueOf("모집중"))) {
                    makeTeam = false;
                    break;
                }
            }
        }
        if(!makeTeam) {
            throw new CustomException(ErrorCode.ALREADY_TEAM_EXIST);
        }

        // 팀 정보 저장
        Team team = Team.fromTeamRequest(teamRequest);
        Team savedTeam = teamRepository.save(team);

        // 팀장 정보 저장
        User captain = userRepository.findById(teamRequest.getWriterId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Team newTeam = teamRepository.findById(savedTeam.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));

        // Builder 패턴 수정
        UserTeam teamCaptain = UserTeam.builder()
                .role(Role.valueOf("팀장"))
                .user(captain)
                .team(newTeam)
                .permit(true)
                .build();
        userTeamRepository.save(teamCaptain);

        // 팀원 정보 저장 - 주어진 유저 id값 목록 사용
        List<User> userList = new ArrayList<>();
        List<Long> userIdList = teamRequest.getUserList();
        userIdList.forEach(ui -> userList.add(userRepository.findById(ui)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER))));

        for(User user : userList) {
            UserTeam userTeam = UserTeam.builder()
                    .role(Role.valueOf("팀원"))
                    .user(user)
                    .team(savedTeam)
                    .permit(true)
                    .build();
            userTeamRepository.save(userTeam);
        }
        return savedTeam.toTeamResponse();
    }

    // 팀 정보 수정
    @Override
    public TeamResponse updateTeam(Long teamId, TeamRequest teamRequest) {

        // 팀 정보 수정
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        team.updateTeam(teamRequest);

        return team.toTeamResponse();
    }

    // 팀 정보 삭제
    @Override
    public Long deleteTeam(Long teamId) {

        if(teamRepository.findById(teamId).isPresent()) {
            teamRepository.deleteById(teamId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
        return teamId;
    }

    // 선수가 팀에 신청
    @Override
    @Transactional
    public UserTeamResponse requestTeam(Long teamId, Long userId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if(userTeamRepository.findByTeamIdAndUserId(teamId, userId).isPresent()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        UserTeam userTeam = UserTeam.builder()
                .user(user)
                .team(team)
                .role(Role.valueOf("팀원"))
                .build();
        UserTeam seavedUserTeam = userTeamRepository.save(userTeam);

        userTeam = userTeamRepository.findByTeamIdAndRole(teamId, Role.valueOf("팀장"))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        User captain = userTeam.getUser();
        Notice notice = Notice.createTeamNotice(captain, user);
        noticeRepository.save(notice);
        return seavedUserTeam.toUserTeamResponse();
    }

    // 선수 정보로 신청 목록 확인
    @Override
    public List<UserTeamResponse> getUserTeamByUser(Long userId) {

        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        List<UserTeam> userTeamList = userTeamRepository.findByUserId(userId);
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));
        return userTeamResponseList;
    }

    // 팀 정보로 신청 목록 확인
    @Override
    public List<UserTeamResponse> getUserTeamByTeam(HttpServletRequest httpServletRequest, Long teamId) {

        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamId(teamId);
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));

        // 경기수 세기
        userTeamResponseList.forEach(u -> u.updateGames(u.getGames()));

        // 팀장인 경우 전화번호 보여주기
        User user = jwtUtil.getUserFromAccessToken(httpServletRequest);
        Long userId = user.getId();

        // 매니저 정보 가져오기
        Long managerId = 0L;
        UserTeam manager = userTeamRepository.findByTeamIdAndRole(teamId, Role.valueOf("팀장")).orElse(null);
        if(manager != null) {
            managerId = manager.getUser().getId();
        }

        // 현재 유저가 매니저인지 확인하기
        if(userId.equals(managerId)) {
            userTeamResponseList.forEach(utr -> userRepository.findById(utr.getUserId())
                    .ifPresent(currentUser -> utr.updatePhone(currentUser.getPhone())));
        }


        return userTeamResponseList;
    }

    // 팀장이 신청자의 신청 승인 - 팀 목록에 추가
    @Override
    public UserTeamResponse acceptTeam(Long teamId, Long userId) {

        // 최대 인원수(7명)를 넘게 추가하는 경우 예외처리
        int teamMembers = userTeamRepository.findAllByTeamIdAndPermitIsTrue(teamId).size();
        if(teamMembers == 7) {
            throw new CustomException(ErrorCode.MEMBER_LIMIT_EXCEEDED);
        }
        UserTeam userTeam = userTeamRepository.findByTeamIdAndUserId(teamId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        // 이미 팀에 추가된 사용자인 경우 예외처리
        if(userTeam.getPermit()) {
            throw new CustomException(ErrorCode.MEMBER_ALREADY_ACCEPTED);
        }
        userTeam.changePermit(true);
        // 인원 수 추가 후 7명이 되었으면 모집 상태를 "모집 완료"로 변경
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        if(teamMembers == 6) {
            team.updateStatus(Status.valueOf("모집완료"));
        }
        return userTeam.toUserTeamResponse();
    }

    // 팀장이 신청자의 신청 거절
    @Override
    public Long rejectTeam(Long teamId, Long userId) {

        UserTeam userTeam = userTeamRepository.findByTeamIdAndUserId(teamId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        userTeamRepository.deleteById(userTeam.getId());
        return userId;
    }

    @Override
    public TeamResponse endTeamRecruit(Long teamId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        team.updateStatus(Status.valueOf("모집완료"));
        return team.toTeamResponse();
    }

    // 선수 카드 정보 불러오기
    @Override
    @Transactional(readOnly = true)
    public List<CardResponse> getCardsByTeam(Long teamId) {

        if(teamRepository.findById(teamId).isPresent()) {
            List<Card> cardList = userTeamRepository.findCardsByTeamId(teamId);
            return cardList.stream().map(CardResponse::fromEntity).toList();
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
    }

    @Override
    public TeamResponse getMyTeam(HttpServletRequest httpServletRequest) {

        Long userId = jwtUtil.getUserFromAccessToken(httpServletRequest).getId();
        List<UserTeam> userTeamList = userTeamRepository.findAllByUserId(userId);
        Long teamId = 0L;
        for(UserTeam ut : userTeamList) {
            Team team = teamRepository.findById(ut.getTeam().getId()).orElse(null);
            if(team != null && team.getStatus() != Status.valueOf("경기종료")) {
                teamId = ut.getTeam().getId();
                break;
            }
        }

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        return team.toTeamResponse();
    }

}
