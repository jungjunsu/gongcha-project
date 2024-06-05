package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.TransferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Transfer", description = "이적시장 관련 API")
@RestController
@RequestMapping("/transfer")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    // 이적시장 정보 전체 조회
    @Operation(
            summary = "이적시장 선수 목록 조회",
            description = "이적시장에 등록한 선수 목록 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "이적시장 선수 목록 조회 성공"
    )
    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllTransfers(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable ) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 목록 전체 조회")
                .data(transferService.getAllTransfers(pageable))
                .build(), HttpStatus.OK);
    }

    // 이적시장 정보 상세 조회
    @Operation(
            summary = "이적시장 선수 상세 조회",
            description = "이적시장 선수의 세부 내용 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "이적시장 선수 상세 조회가 완료되었습니다."
    )
    @GetMapping("/{transferId}")
    public ResponseEntity<CommonResponse> getTransfer(@PathVariable Long transferId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 상세 조회")
                .data(transferService.getTransfer(transferId))
                .build(), HttpStatus.OK);
    }
    
    // 이적시장 정보 작성
    @Operation(
            summary = "이적시장 선수 정보 생성",
            description = "유저가 이적시장에서 선수정보를 생성함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "이적시장 등록이 완료되었습니다."
    )
    @PostMapping("")
    public ResponseEntity<CommonResponse> createTransfer(@RequestBody TransferRequest transferRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 작성")
                .data(transferService.createTransfer(transferRequest))
                .build(), HttpStatus.OK);
    }

    // 이적시장 정보 수정
    @Operation(
            summary = "이적시장 선수 정보 변경",
            description = "이적시장 선수 정보 변경 처리"
    )
    @ApiResponse(
            responseCode = "200",
            description = "이적시장 선수 정보가 변경되었습니다."
    )
    @PatchMapping("/{transferId}")
    public ResponseEntity<CommonResponse> updateTransfer(@PathVariable Long transferId, @RequestBody TransferRequest transferRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 수정")
                .data(transferService.updateTransfer(transferId, transferRequest))
                .build(), HttpStatus.OK);
    }

    // 이적시장 정보 삭제
    @Operation(
            summary = "이적시장 선수 정보 삭제",
            description = "이적시장 선수 정보 삭제"
    )
    @ApiResponse(
            responseCode = "200",
            description = "이적시장에서 선수 정보가 삭제되었습니다."
    )
    @DeleteMapping("/{transferId}")
    public ResponseEntity<CommonResponse> deleteTransfer(@PathVariable Long transferId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 삭제")
                .data(transferService.deleteTransfer(transferId))
                .build(), HttpStatus.OK);
    }
    
    // 이적시장 선수에게 팀장이 신청
    @Operation(
            summary = "팀장 -> 선수 참가 신청",
            description = "이적시장에서 팀장이 선수에게 참가 요청"
    )
    @ApiResponse(
            responseCode = "200",
            description = "해당 선수에게 합류 요청이 발송되었습니다."
    )
    @PostMapping("/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> requestTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 선수에게 팀장이 신청")
                .data(transferService.requestTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }

    // 이적시장 번호로 해당 선수가 받은 신청 목록 조회
    @Operation(
            summary = "선수가 받은 참가 신청 목록 조회",
            description = "이적시장에서 선수가 팀장들에게 받은 참가 요청 목록 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "해당 유저의 합류 요청 목록 조회에 성공하였습니다."
    )
    @GetMapping("/request/{transferId}")
    public ResponseEntity<CommonResponse> getUserTransferList(@PathVariable Long transferId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("해당 선수가 받은 신청 목록 조회")
                .data(transferService.getUserTransferByTransfer(transferId))
                .build(), HttpStatus.OK);
    }

    // 이적시장 신청 승인
    @Operation(
            summary = "팀장 -> 선수 참가 신청 승인",
            description = "이적시장에서 팀장이 선수에게 참가 요청을 선수가 승인"
    )
    @ApiResponse(
            responseCode = "200",
            description = "합류 요청이 승인되었습니다."
    )
    @PatchMapping("/request/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> acceptTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 신청 승인")
                .data(transferService.acceptTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }
    
    // 이적시장 신청 거절
    @Operation(
            summary = "팀장 -> 선수 참가 신청 거절",
            description = "이적시장에서 팀장이 선수에게 참가 요청 선수가 거절"
    )
    @ApiResponse(
            responseCode = "200",
            description = "합류 요청이 거절되었습니다."
    )
    @DeleteMapping("/request/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> rejectTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 신청 거절")
                .data(transferService.rejectTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }

}
