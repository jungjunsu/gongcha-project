package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.ClubMakeRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.service.ClubService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Club", description = "Club 관련 API")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/club")
public class ClubController {

    private final ClubService clubService;

    @Operation(
            summary = "클럽 생성",
            description = "유저가 클럽을 생성함."
    )
    @ApiResponse(
        responseCode = "200",
        description = "클럽이 정상적으로 생성되었습니다."
    )
    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createClub(
            HttpServletRequest httpServletRequest,
            @RequestBody ClubMakeRequest request) {

        clubService.createClub(httpServletRequest, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 생성 완료")
                .build(), HttpStatus.OK);
    }


    @Operation(
            summary = "클럽 전체 조회",
            description = "클럽에 대한 값들을 페이지네이션으로 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 조회가 정상적으로 조회되었습니다."
    )
    @GetMapping("/clubs")
    public ResponseEntity<CommonResponse> getAllClubs(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 전체 조회 완료")
                .data(clubService.getAllClubs(pageable))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 삭제",
            description = "클럽 마스터가 클럽을 삭제"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 삭제가 정상 처리되었습니다."
    )
    @DeleteMapping("/delete/{clubId}")
    public ResponseEntity<CommonResponse> deleteClub(@PathVariable Long clubId,
                                                     HttpServletRequest request) {

        clubService.deleteClub(request, clubId);

        return new ResponseEntity<>(CommonResponse.builder()
                .message("삭제가 처리되었습니다.")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 상세 조회",
            description = "클럽에 대한 세부 내용 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 상세 조회가 완료되었습니다."
    )
    @GetMapping("/{clubId}")
    public ResponseEntity<CommonResponse> getClubDetail(@PathVariable Long clubId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 상세 조회 성공")
                .data(clubService.clubDetail(clubId))
                .build(), HttpStatus.OK);

    }

    @Operation(
            summary = "클럽의 클럽원 조회",
            description = "클럽의 클럽원들 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽원들이 정상적으로 조회되었습니다."
    )
    @GetMapping("/{clubId}/clubUsers")
    public ResponseEntity<CommonResponse> getClubUsers(@PathVariable Long clubId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽원 조회 성공")
                .data(clubService.getClubUsers(clubId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 로고 변경",
            description = "클럽 로고에 대한 변경 처리"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 로고가 정상적으로 변경되었습니다."
    )
    @PatchMapping("/{clubId}/logo")
    public ResponseEntity<CommonResponse> updateLogo(
            @PathVariable Long clubId,
            HttpServletRequest request,
            @RequestPart(value = "file", required = false)MultipartFile file) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 로고 수정 완료")
                .data(clubService.updateLogo(request, clubId, file))
                .build(), HttpStatus.OK);
    }

    @GetMapping("/myClub")
    public ResponseEntity<CommonResponse> getMyClub(HttpServletRequest request) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("내 클럽에 대한 조회 완료")
                .data(clubService.getMyClub(request))
                .build(), HttpStatus.OK);
    }
}
