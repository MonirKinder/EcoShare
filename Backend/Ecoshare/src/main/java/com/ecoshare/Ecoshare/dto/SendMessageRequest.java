package com.ecoshare.Ecoshare.dto;

import lombok.Data;

@Data
public class SendMessageRequest {
    private Long itemId;
    private Long toUserId;
    private String content;
}
