package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.Notice;
import com.b306.gongcha.entity.NoticeType;
import com.b306.gongcha.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class NoticeBoxResponse {

    private String content;
    private Long fromUserId;
    private Long toUserId;
    private NoticeType noticeType;
    private Boolean readPermit;
    private Boolean responsePermit;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static List<NoticeBoxResponse> fromEntity(List<Notice> notices) {

        return notices.stream()
                .map(notice -> NoticeBoxResponse.builder()
                        .content(notice.getContent())
                        .fromUserId(notice.getFromUserId())
                        .toUserId(notice.getToUserId())
                        .noticeType(notice.getNoticeType())
                        .readPermit(notice.getReadPermit())
                        .responsePermit(notice.getResponsePermit())
                        .createdAt(notice.getCreatedAt())
                        .modifiedAt(notice.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
