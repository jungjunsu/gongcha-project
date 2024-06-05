package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Card;
import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.num.ClubRole;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.CardRepository;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class ClubUserResponse {

    private String userName;
    private ClubRole userRole;
    private int manner;
    private int shooting;
    private int pass;
    private int dribble;
    private int speed;
    private String profileImage;
    private String phone;

    public static List<ClubUserResponse> from(Club club, CardRepository cardRepository) {
        return club.getClubUser().stream()
                .map(user -> {
                    Card card = cardRepository.findByUserId(user.getId())
                            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
                    return ClubUserResponse.builder()
                            .userName(user.getName())
                            .userRole(user.getClubRole())
                            .manner(user.getManner())
                            .shooting(card != null ? card.getShooting() : 0)
                            .pass(card != null ? card.getPass() : 0)
                            .dribble(card != null ? card.getDribble() : 0)
                            .speed(card != null ? card.getSpeed() : 0)
                            .profileImage(user.getProfile())
                            .phone(user.getPhone())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
