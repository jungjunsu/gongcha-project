package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Transfer;
import com.b306.gongcha.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserTransferRequest {

    private Boolean permit;
    private User user;
    private Transfer transfer;

}
