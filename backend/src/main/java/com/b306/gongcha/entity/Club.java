package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.ClubMakeRequest;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Club extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "club")
    @Builder.Default
    private List<User> clubUser = new ArrayList<>();

    private String master;

    @Column(columnDefinition = "TEXT")
    private String description;
    private String logo;

    private LocalTime activityStartTime;
    private LocalTime activityEndTime;
    private String skillLevel;
    private String region;
    private String districts;

    public void updateName(String name) {
        this.name = name;
    }

    public void addClubUser(User user) {
        // 추가하려는 유저가 이미 추가되있는 유저일 경우
        if(clubUser.contains(user)) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_USER);
        }
        clubUser.add(user);
    }

    public void removeUser(User user) {
        // 삭제하려는 유저가 이미 없는 경우
        if(!clubUser.contains(user)) {
            throw new CustomException(ErrorCode.NOT_FOUND_USER);
        }
        clubUser.remove(user);
    }

    public void updateLogo(String logo) {
        this.logo = logo;
    }

    public void changeMaster(String userName) {
        this.master = userName;
    }


    public static Club fromRequest(ClubMakeRequest request) {
        return Club.builder()
                .name(request.getClubName())
                .description(request.getDescription())
                .activityStartTime(request.getActivityStartTime())
                .activityEndTime(request.getActivityEndTime())
                .skillLevel(request.getSkillLevel())
                .region(request.getRegion())
                .districts(request.getDistricts())
                .build();
    }

    public List<User> getClubMembers() {
        return this.clubUser;
    }

}
