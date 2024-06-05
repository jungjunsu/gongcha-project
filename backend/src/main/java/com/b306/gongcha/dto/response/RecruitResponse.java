package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Gender;
import com.b306.gongcha.entity.Indoor;
import com.b306.gongcha.entity.Status;
import lombok.*;

@Getter
@Builder
public class RecruitResponse {

    private Long id;
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

}
