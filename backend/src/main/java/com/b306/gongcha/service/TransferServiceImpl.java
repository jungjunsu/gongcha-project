package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.request.UserTeamRequest;
import com.b306.gongcha.dto.request.UserTransferRequest;
import com.b306.gongcha.dto.response.TransferResponse;
import com.b306.gongcha.dto.response.UserTransferResponse;
import com.b306.gongcha.entity.*;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService{

    private final TransferRepository transferRepository;
    private final UserTransferRepository userTransferRepository;
    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;
    private final TeamRepository teamRepository;

    // 매칭 게시판에서 팀장인지 확인
    public Long getTeamId(Long userId) {

        List<UserTeam> userTeamList = userTeamRepository.findAllByUserIdAndRole(userId, Role.valueOf("팀장"));
        Long teamId = 0L;
        for(UserTeam u : userTeamList) {
            // 모집중 상태인 팀 1개만 찾기
            if(u.getTeam().getStatus() == Status.valueOf("모집중")) {
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

    // 이적시장 선수 전체 조회
    @Override
    @Transactional(readOnly = true)
    public Page<TransferResponse> getAllTransfers(Pageable pageable) {

        Page<Transfer> pages = transferRepository.findAll(pageable);
        return pages.map(TransferResponse::fromEntity);
    }

    // 이적시장 선수 상세 조회
    @Override
    @Transactional(readOnly = true)
    public TransferResponse getTransfer(Long transferId) {

        // 조회 실패 시 해당 정보 조회 실패 에러 반환
        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        return transfer.toTransferResponse();
    }

    // 이적시장 선수 정보 작성
    @Override
    @Transactional
    public TransferResponse createTransfer(TransferRequest transferRequest) {

        // 이미 이적시장에 정보 등록 시 중복등록 방지
        if(transferRepository.findByUserId(transferRequest.getWriterId()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_TRANSFER_APPLY);
        }

        Transfer transfer = transferRequest.toTransfer();
        User user = userRepository.findById(transferRequest.getWriterId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        transfer.addUser(user);
        transferRepository.save(transfer);
        return transfer.toTransferResponse();
    }

    // 이적시장 선수 정보 수정
    @Override
    public TransferResponse updateTransfer(Long transferId, TransferRequest transferRequest) {

        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(transferRequest.getWriterId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        transfer.updateTransfer(transferRequest);
        transfer.addUser(user);
        return transfer.toTransferResponse();
    }

    // 이적시장 선수 정보 삭제
    @Override
    public Long deleteTransfer(Long transferId) {

        // 조회 실패 시 해당 정보 조회 실패 에러 반환
        if(transferRepository.findById(transferId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        else {
            transferRepository.deleteById(transferId);
        }
        return transferId;
    }

    // 이적시장 합류 신청
    @Override
    @Transactional
    public UserTransferResponse requestTransfer(Long transferId, Long userId) {

        // 팀장 여부 확인 - 팀장만 요청을 할 수 있음
        Long captainId = getTeamId(userId);

        // 이적시장 정보, 신청자 정보 받아오기
        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        // 작성자와 신청자가 동일인인 경우
        if(userId.equals(transfer.getUser().getId())) {
            throw new CustomException(ErrorCode.BAD_REQUEST_APPLY);
        }
        // 신청자가 해당 글에 중복 신청한 경우
        else if(userTransferRepository.findByTransferIdAndUserId(transferId, userId).isPresent()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }

        UserTransferRequest userTransferRequest = new UserTransferRequest(false, user, transfer);
        UserTransfer userTransfer = UserTransfer.fromRequest(userTransferRequest);
        userTransfer.changePermit(false);
        userTransfer.changeUser(user);
        userTransfer.changeTransfer(transfer);
        return userTransferRepository.save(userTransfer).toUserTransferResponse();
    }

    // 신청자 번호로 해당 선수 신청 내역 조회 
    @Override
    public List<UserTransferResponse> getUserTransferByUser(Long userId) {

        List<UserTransferResponse> userTransferResponseList = new ArrayList<>();
        List<UserTransfer> userTransferList = userTransferRepository.findAllByUserId(userId);
        userTransferList.forEach(ut -> userTransferResponseList.add(ut.toUserTransferResponse()));
        return userTransferResponseList;
    }
    
    // 이적시장 번호로 해당 선수 받은 신청 내역 조회
    @Override
    public List<UserTransferResponse> getUserTransferByTransfer(Long transferId) {

        List<UserTransferResponse> userTransferResponseList = new ArrayList<>();
        List<UserTransfer> userTransferList = userTransferRepository.findAllByTransferId(transferId);
        userTransferList.forEach(ut -> userTransferResponseList.add(ut.toUserTransferResponse()));
        return userTransferResponseList;
    }

    // 이적시장 번호, 신청자 번호로 해당 게시글 신청 선수 내역 조회
    @Override
    public UserTransferResponse getUserTransfer(Long transferId, Long userId) {

        return userTransferRepository.findByTransferIdAndUserId(transferId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST)).toUserTransferResponse();
    }

    // 이적시장 신청 승인 - 승인 후 UserTeam Table에 추가
    @Override
    @Transactional
    public UserTransferResponse acceptTransfer(Long transferId, Long userId) {

        // 이적시장 게시글이 존재하는지 확인
        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        transfer.updateJoin(true);

        // 선수에게 요청한 사람이 팀장인가 확인
        Long captainTeamId = getTeamId(userId);
        Team team = teamRepository.findById(captainTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        User user = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)).getUser();
        UserTeamRequest userTeamRequest = new UserTeamRequest(Role.valueOf("팀원"), true, user, team);
        UserTeam userTeam = UserTeam.fromRequest(userTeamRequest);
        userTeam.changeUser(user);
        userTeam.changeTeam(team);
        userTeam.changeRole(Role.valueOf("팀원"));
        userTeam.changePermit(true);
        userTeamRepository.save(userTeam);
        // 선수 신청 승인 처리
        UserTransfer userTransfer = userTransferRepository.findByTransferIdAndUserId(transferId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userTransfer.changePermit(true);

        return userTransfer.toUserTransferResponse();
    }

    // 이적시장 신청 거절
    @Override
    public Long rejectTransfer(Long transferId, Long userId) {

        UserTransfer userTransfer = userTransferRepository.findByTransferIdAndUserId(transferId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userTransferRepository.deleteById(userTransfer.getId());
        return transferId;
    }
}
