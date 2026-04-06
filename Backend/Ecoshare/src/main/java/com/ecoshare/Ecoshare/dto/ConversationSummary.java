package com.ecoshare.Ecoshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ConversationSummary {
    private Long itemId;
    private String itemTitle;
    private Long otherUserId;
    private String otherUserName;
    private String lastMessage;
    private LocalDateTime lastMessageAt;
    private long unreadCount;
}
