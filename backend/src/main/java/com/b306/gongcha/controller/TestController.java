package com.b306.gongcha.controller;

import com.b306.gongcha.dto.response.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<CommonResponse> test() {
        return new ResponseEntity<>(CommonResponse.builder()
                .message("테스트 코드 작성입니다.")
                .data("여기는 서비스단의 코드가 들어가야 합니다. ex) testService.method(Parameter)")
                .build(), HttpStatus.OK);
    }
}
