package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.RecruitRequest;
import com.b306.gongcha.dto.response.RecruitResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Recruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruit_id")
    private Long id;

    private String date; // 경기 신청 시간
    private String address; // 시, 도 위치
    private String field; // 경기장 위치
    private String info; // 게시글 소개

    @Enumerated(EnumType.STRING)
    private Gender gender; // 성별

    @Enumerated(EnumType.STRING)
    private Indoor indoor; // 실내, 실외 여부

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    private Status status; // 모집 상태 정보

    @Column(name = "current_players")
    private int currentPlayers; // 현재 신청된 인원

    @Column(name = "all_players")
    private int allPlayers; // 경기 최대 인원

    @OneToMany(mappedBy = "recruit", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<UserRecruit> userRecruitList = new ArrayList<>();

    public void updateCurrentPlayers() {
        this.currentPlayers++;
    }

    public void updateRecruit(RecruitRequest recruitRequest) {

        this.date = recruitRequest.getDate();
        this.address = recruitRequest.getAddress();
        this.field = recruitRequest.getField();
        this.info = recruitRequest.getInfo();
        this.gender = recruitRequest.getGender();
        this.indoor = recruitRequest.getIndoor();
        this.difficulty = recruitRequest.getDifficulty();
        this.status = recruitRequest.getStatus();
        this.currentPlayers = recruitRequest.getCurrentPlayers();
        this.allPlayers = recruitRequest.getAllPlayers();
    }

    public RecruitResponse toRecruitResponse() {

        RecruitResponse recruitResponse = RecruitResponse.builder()
                .id(id)
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
        return recruitResponse;
    }

}
