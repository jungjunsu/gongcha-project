package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.RecruitRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.RecruitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recruit")
@RequiredArgsConstructor
public class RecruitController {

    private final RecruitService recruitService;

    // 선수 구인 게시글 전체 조회
    @GetMapping("/")
    public ResponseEntity<CommonResponse> getAllRecruits() {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 전체 조회")
                .data(recruitService.getAllRecruits())
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 상세 조회
    @GetMapping("/{recruitId}")
    public ResponseEntity<CommonResponse> getRecruit(@PathVariable Long recruitId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 상세 조회")
                .data(recruitService.getRecruit(recruitId))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 작성
    @PostMapping("/")
    public ResponseEntity<CommonResponse> createRecruit(@RequestBody RecruitRequest recruitRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 작성")
                .data(recruitService.createRecruit(recruitRequest))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 수정
    @PatchMapping("/{recruitId}")
    public ResponseEntity<CommonResponse> updateRecruit(@PathVariable Long recruitId, @RequestBody RecruitRequest recruitRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 수정")
                .data(recruitService.updateRecruit(recruitId, recruitRequest))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 삭제
    @DeleteMapping("/{recruitId}")
    public ResponseEntity<CommonResponse> deleteRecruit(@PathVariable Long recruitId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 삭제")
                .data(recruitService.deleteRecruit(recruitId))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 구인 신청
    @PostMapping("/{recruitId}/{userId}")
    public ResponseEntity<CommonResponse> requestRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 구인 신청")
                .data(recruitService.requestRecruit(recruitId, userId))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 번호로 해당 게시글 신청 목록 조회
    @GetMapping("/request/{recruitId}")
    public ResponseEntity<CommonResponse> getUserRecruitList(@PathVariable Long recruitId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 구인 신청 목록 조회")
                .data(recruitService.getUserRecruitByRecruit(recruitId))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 번호와 신청 선수 번호로 개별 신청 조회
    @GetMapping("/request/{recruitId}/{userId}")
    public ResponseEntity<CommonResponse> getUserRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 구인 신청 조회")
                .data(recruitService.getUserRecruit(recruitId, userId))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 구인 신청 승인
    @PatchMapping("/{recruitId}/{userId}")
    public ResponseEntity<CommonResponse> acceptRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 구인 신청 승인")
                .data(recruitService.acceptRecruit(recruitId, userId))
                .build(), HttpStatus.OK);
    }

    // 선수 구인 게시글 구인 신청 거절
    @DeleteMapping("/{recruitId}/{userId}")
    public ResponseEntity<CommonResponse> rejectRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 구인 신청 거절")
                .data(recruitService.rejectRecruit(recruitId, userId))
                .build(), HttpStatus.OK);
    }

}
