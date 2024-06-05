package com.b306.gongcha.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Notice extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;

    @Schema(description = "알림 보내는 유저")
    private Long fromUserId;

    @Schema(description = "알림 받는 유저")
    private Long toUserId;

    @Schema(description = "알림 내용", allowableValues = "..님으로 부터 팀 가입 요청이 도착했습니다.")
    private String content;

    @Schema(description = "알림 조회 여부", allowableValues = "true")
    private Boolean readPermit;

    @Schema(description = "알림 처리 여부", allowableValues = "true")
    private Boolean responsePermit;

    @Enumerated(EnumType.STRING)
    @Schema(description = "알림 타입", allowableValues = { "invite", "join", "matching"} )
    private NoticeType noticeType;

    public static Notice createClubNotice(User applyUser, User user){

        return Notice.builder()
                .toUserId(applyUser.getId())
                .fromUserId(user.getId())
                .content(applyUser.getName() + "님으로부터 클럽 가입 요청이 도착했습니다.")
                .noticeType(NoticeType.invite)
                .readPermit(false)
                .responsePermit(false)
                .build();
    }

    public static Notice createTeamNotice(User captain, User user){

        return Notice.builder()
                .toUserId(user.getId())
                .fromUserId(captain.getId())
                .content(user.getName() + "님으로부터 팀 가입 요청이 도착했습니다.")
                .noticeType(NoticeType.invite)
                .readPermit(false)
                .responsePermit(false)
                .build();
    }
}
