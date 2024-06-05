package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Club;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class ClubMakeRequest {

    private String clubName;
    private String description;
    private LocalTime activityStartTime;
    private LocalTime activityEndTime;
    private String skillLevel;
    private String region;
    private String districts;

}
