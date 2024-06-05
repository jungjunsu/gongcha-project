package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.UserRatingRequest;
import com.b306.gongcha.dto.response.CardResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface CardService {

    CardResponse getCard(Long userId);

    CardResponse getMyCard(HttpServletRequest request);

    void userRating(UserRatingRequest cardRequest);
}
