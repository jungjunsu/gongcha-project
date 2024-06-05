package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.ClubApplyRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.ClubApplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "ClubApply", description = "클럽 신청 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/club/applies")
public class ClubApplyController {

    private final ClubApplyService clubApplyService;

    @Operation(
            summary = "클럽 신청",
            description = "유저가 클럽에 합류 요청을 신청함"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 신청이 정상적으로 완료되었습니다."
    )
    @PostMapping("/{clubId}")
    public ResponseEntity<CommonResponse> applyClub(
            @PathVariable Long clubId,
            HttpServletRequest httpServletRequest,
            @RequestBody ClubApplyRequest request) {

        clubApplyService.applyClub(httpServletRequest, clubId, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 신청 완료")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 신청 조회",
            description = "클럽 신청 목록 조회를 합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 신청 목록 조회가 완료되었습니다."
    )
    @GetMapping("/{clubId}")
    public ResponseEntity<CommonResponse> getClubApplies(
            HttpServletRequest httpServletRequest,
            @PathVariable Long clubId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 신청 목록 조회 완료")
                .data(clubApplyService.getAllClubApplies(httpServletRequest, clubId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 신청 승인",
            description = "클럽 신청에 대해서 승인해줍니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 신청이 완료되었습니다."
    )
    @PostMapping("/{clubId}/{applyId}/permit")
    public ResponseEntity<CommonResponse> permitApply(
            HttpServletRequest httpServletRequest,
            @PathVariable Long clubId,
            @PathVariable Long applyId) {

        clubApplyService.permitApply(httpServletRequest, clubId, applyId);

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 신청이 승인되었습니다.")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 신청 거부",
            description = "클럽 신청이 거부되었습니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 신청이 거부가 완료되었습니다."
    )
    @PostMapping("/{clubId}/{applyId}/deny")
    public ResponseEntity<CommonResponse> deniedApply(
            HttpServletRequest request,
            @PathVariable Long clubId,
            @PathVariable Long applyId) {

        clubApplyService.deniedApply(request, clubId, applyId);

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 신청이 거부되었습니다.")
                .build(), HttpStatus.OK);
    }
    
}
