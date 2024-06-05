package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Card;
import lombok.*;

@Getter
@Builder
public class CardResponse {

    private int shooting;
    private int pass;
    private int dribble;
    private int speed;

    public static CardResponse fromEntity(Card card){

        return CardResponse.builder()
                .shooting(card.getShooting())
                .pass(card.getPass())
                .dribble(card.getDribble())
                .speed(card.getSpeed())
                .build();
    }
}
