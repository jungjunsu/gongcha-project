package com.b306.gongcha.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NotificationRequest {

    private Long userId;  // target 유저 아이디
    private String title;
    private String body;

//    @Builder
//    public NotificationRequest(Long userId, String title, String body){
//        this.userId = userId;
//        this.title = title;
//        this.body = body;
//    }
}
