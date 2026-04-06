package com.ecoshare.Ecoshare.controller;

import com.ecoshare.Ecoshare.dto.ConversationSummary;
import com.ecoshare.Ecoshare.dto.SendMessageRequest;
import com.ecoshare.Ecoshare.model.Message;
import com.ecoshare.Ecoshare.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /**
     * POST /api/messages
     * Envoyer un message
     * Body: { itemId, toUserId, content }
     */
    @PostMapping
    public ResponseEntity<Message> sendMessage(Authentication auth,
                                               @RequestBody SendMessageRequest request) {
        Message message = messageService.sendMessage(auth.getName(), request);
        return ResponseEntity.ok(message);
    }

    /**
     * GET /api/messages/conversations
     * Liste toutes les conversations du user connecté
     */
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationSummary>> getMyConversations(Authentication auth) {
        List<ConversationSummary> conversations = messageService.getMyConversations(auth.getName());
        return ResponseEntity.ok(conversations);
    }

    /**
     * GET /api/messages/conversation?itemId=1&otherUserId=2
     * Récupère tous les messages d'une conversation entre le user connecté et un autre user sur un item
     */
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(Authentication auth,
                                                          @RequestParam Long itemId,
                                                          @RequestParam Long otherUserId) {
        List<Message> messages = messageService.getConversation(auth.getName(), itemId, otherUserId);
        return ResponseEntity.ok(messages);
    }

    /**
     * GET /api/messages/unread
     * Nombre de messages non lus pour le user connecté
     */
    @GetMapping("/unread")
    public ResponseEntity<Map<String, Long>> countUnread(Authentication auth) {
        long count = messageService.countUnread(auth.getName());
        return ResponseEntity.ok(Map.of("unread", count));
    }
}
