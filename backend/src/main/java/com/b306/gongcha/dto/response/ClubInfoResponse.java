package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Club;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@Builder
public class ClubInfoResponse {

    private Long clubId;
    private String logo;
    private String name;
    private String master;
    private String region;
    private String districts;
    private String skillLevel; // 게임 수준
    private String description;
    private int clubUsers;
    private LocalTime startTime;
    private LocalTime endTime;

    public static ClubInfoResponse fromEntity(Club club) {
        return ClubInfoResponse.builder()
                .clubId(club.getId())
                .logo(club.getLogo())
                .name(club.getName())
                .master(club.getMaster())
                .region(club.getRegion())
                .districts(club.getDistricts())
                .skillLevel(club.getSkillLevel())
                .startTime(club.getActivityStartTime())
                .endTime(club.getActivityEndTime())
                .description(club.getDescription())
                .clubUsers(club.getClubUser().size())
                .build();
    }
}
