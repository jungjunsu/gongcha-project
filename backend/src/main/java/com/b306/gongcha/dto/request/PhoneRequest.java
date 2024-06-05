package com.b306.gongcha.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PhoneRequest {

    private String name;
    private String number;
}
