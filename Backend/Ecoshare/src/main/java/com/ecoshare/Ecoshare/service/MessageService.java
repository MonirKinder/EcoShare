package com.ecoshare.Ecoshare.service;

import com.ecoshare.Ecoshare.dto.ConversationSummary;
import com.ecoshare.Ecoshare.dto.SendMessageRequest;
import com.ecoshare.Ecoshare.model.Item;
import com.ecoshare.Ecoshare.model.Message;
import com.ecoshare.Ecoshare.model.User;
import com.ecoshare.Ecoshare.repository.ItemRepository;
import com.ecoshare.Ecoshare.repository.MessageRepository;
import com.ecoshare.Ecoshare.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public MessageService(MessageRepository messageRepository,
                          UserRepository userRepository,
                          ItemRepository itemRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    // Envoyer un message
    @Transactional
    public Message sendMessage(String senderEmail, SendMessageRequest request) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        User receiver = userRepository.findById(request.getToUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destinataire introuvable"));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Annonce introuvable"));

        if (sender.getId().equals(receiver.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous ne pouvez pas vous envoyer un message à vous-même");
        }

        if (request.getContent() == null || request.getContent().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le message ne peut pas être vide");
        }

        Message message = new Message();
        message.setFromUser(sender);
        message.setToUser(receiver);
        message.setItem(item);
        message.setContent(request.getContent().trim());

        return messageRepository.save(message);
    }

    // Récupérer une conversation complète entre 2 users sur un item
    @Transactional
    public List<Message> getConversation(String currentUserEmail, Long itemId, Long otherUserId) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        // Marquer les messages reçus comme lus
        messageRepository.markAsRead(itemId, otherUserId, currentUser.getId());

        return messageRepository.findConversation(itemId, currentUser.getId(), otherUserId);
    }

    // Récupérer la liste de toutes les conversations du user connecté
    @Transactional(readOnly = true)
    public List<ConversationSummary> getMyConversations(String currentUserEmail) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        List<Message> allMessages = messageRepository.findAllMessagesForUser(currentUser.getId());

        // Grouper par (itemId, otherUserId) et garder le dernier message
        Map<String, Message> lastMessages = new LinkedHashMap<>();

        for (Message m : allMessages) {
            Long otherUserId = m.getFromUser().getId().equals(currentUser.getId())
                    ? m.getToUser().getId()
                    : m.getFromUser().getId();

            String key = m.getItem().getId() + "_" + otherUserId;

            // On a déjà le plus récent (ORDER BY sentAt DESC)
            lastMessages.putIfAbsent(key, m);
        }

        List<ConversationSummary> summaries = new ArrayList<>();
        for (Message m : lastMessages.values()) {
            Long otherUserId = m.getFromUser().getId().equals(currentUser.getId())
                    ? m.getToUser().getId()
                    : m.getFromUser().getId();

            User otherUser = m.getFromUser().getId().equals(currentUser.getId())
                    ? m.getToUser()
                    : m.getFromUser();

            // Compter les non-lus pour cette conversation spécifique
            long unread = messageRepository.findConversation(
                    m.getItem().getId(), currentUser.getId(), otherUserId
            ).stream().filter(msg -> !msg.isRead() && msg.getToUser().getId().equals(currentUser.getId())).count();

            summaries.add(new ConversationSummary(
                    m.getItem().getId(),
                    m.getItem().getTitle(),
                    otherUserId,
                    otherUser.getName(),
                    m.getContent(),
                    m.getSentAt(),
                    unread
            ));
        }

        return summaries;
    }

    // Nombre total de messages non lus
    @Transactional(readOnly = true)
    public long countUnread(String currentUserEmail) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
        return messageRepository.countUnreadForUser(currentUser.getId());
    }
}
