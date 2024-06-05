package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class RecruitRequest {

//    private Long id;
    private String date;
    private String address;
    private String field;
    private String info;
    private Gender gender;
    private Indoor indoor;
    private Difficulty difficulty;
    private Status status;
    private int currentPlayers;
    private int allPlayers;
    private Long writerId;

    public Recruit toRecruit() {
        Recruit recruit = Recruit.builder()
                .date(date)
                .address(address)
                .field(field)
                .info(info)
                .gender(gender)
                .indoor(indoor)
                .difficulty(difficulty)
                .status(status)
                .currentPlayers(currentPlayers)
                .allPlayers(allPlayers)
                .build();
        return recruit;
    }

}
