package com.b306.gongcha.dto.response;

import lombok.*;

@Getter
@Builder
public class UserTransferResponse {

    private Long userId;
    private String userName;
    private Boolean permit;

}
