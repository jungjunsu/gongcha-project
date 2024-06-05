package com.b306.gongcha.entity;

import com.b306.gongcha.dto.response.UserRecruitResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserRecruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruit_rel_id")
    private Long id;

    private Boolean recruit_permit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_user_id")
    private User writerUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruit_id")
    private Recruit recruit;

    public void acceptRecruit() {

        this.recruit_permit = true;
    }

    public UserRecruitResponse toUserRecruitResponse() {

        UserRecruitResponse userRecruitResponse = UserRecruitResponse.builder()
                .id(id)
                .recruit_permit(recruit_permit)
                .writerNickname(writerUser.getName())
                .userNickname(user.getName())
                .build();
        return userRecruitResponse;
    }

}
