package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.DeviceTokenRequest;
import com.b306.gongcha.entity.num.ClubRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;
    private String userInfo;
    private String email;
    private String role;
    private String provider;
    private String profile;
    private String firebaseToken;
    private String phone;
    private int games;

    public void addGames() {

        this.games++;
    }

    @ColumnDefault("50")
    private int manner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @Enumerated(EnumType.STRING)
    private ClubRole clubRole;

    // 편의 메서드
    public void updateName(String name) {
        this.name = name;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updateProfile(String profile) {
        this.profile = profile;
    }

    public void changeRole(ClubRole clubRole) {
        this.clubRole = clubRole;
    }

    public void changeClub(Club club) {
        this.club = club;
    }

    public void deleteClub() {
        this.club = null;
    }

    public void changePhone(String phone) {
        this.phone = phone;
    }

    public void updateToken(DeviceTokenRequest dto){
        this.firebaseToken = dto.getToken();
    }

    public void deleteToken(){
        this.firebaseToken = null;
    }

    public void quitClub() {
        club.getClubUser().remove(this);
        this.club = null;
    }

    // 엔티티가 생성될 때 호출되는 함수
    @PrePersist
    protected void onPrePersist() {
        if (this.manner == 0) {
            this.manner = 50;
        }
    }
}
