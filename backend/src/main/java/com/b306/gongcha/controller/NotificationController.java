package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.DeviceTokenRequest;
import com.b306.gongcha.dto.request.NotificationRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Notification", description = "FCM 알림 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(
            summary = "FCM 알림 전송",
            description = "FCM 서버에 알림을 전송함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "알림 전송에 성공했습니다."
    )
    @PostMapping
    public ResponseEntity<CommonResponse> sendNotification(@RequestBody NotificationRequest request){

        notificationService.sendNotification(request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("알림 전송 성공")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "FCM Device token 저장",
            description = "FCM Device token을 저장함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "토큰 저장에 성공했습니다."
    )
    @PatchMapping("/token")
    public ResponseEntity<CommonResponse> saveDeviceToken(
            @RequestBody DeviceTokenRequest dto,
            HttpServletRequest request){

        notificationService.saveDeviceToken(dto, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("토큰 저장 성공")
                .build(), HttpStatus.OK);
    }
}
