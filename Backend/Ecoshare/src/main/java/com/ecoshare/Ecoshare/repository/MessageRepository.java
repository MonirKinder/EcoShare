package com.ecoshare.Ecoshare.repository;

import com.ecoshare.Ecoshare.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // Récupère tous les messages d'une conversation (entre 2 users sur un item)
    @Query("""
        SELECT m FROM Message m
        WHERE m.item.id = :itemId
          AND ((m.fromUser.id = :userId1 AND m.toUser.id = :userId2)
            OR (m.fromUser.id = :userId2 AND m.toUser.id = :userId1))
        ORDER BY m.sentAt ASC
    """)
    List<Message> findConversation(@Param("itemId") Long itemId,
                                   @Param("userId1") Long userId1,
                                   @Param("userId2") Long userId2);

    // Marque les messages comme lus
    @Modifying
    @Query("""
        UPDATE Message m SET m.read = true
        WHERE m.item.id = :itemId
          AND m.fromUser.id = :fromUserId
          AND m.toUser.id = :toUserId
          AND m.read = false
    """)
    void markAsRead(@Param("itemId") Long itemId,
                    @Param("fromUserId") Long fromUserId,
                    @Param("toUserId") Long toUserId);

    // Récupère toutes les conversations d'un user (dernier message de chaque conversation unique)
    @Query("""
        SELECT m FROM Message m
        WHERE (m.fromUser.id = :userId OR m.toUser.id = :userId)
        ORDER BY m.sentAt DESC
    """)
    List<Message> findAllMessagesForUser(@Param("userId") Long userId);

    // Compte les messages non lus pour un user
    @Query("""
        SELECT COUNT(m) FROM Message m
        WHERE m.toUser.id = :userId AND m.read = false
    """)
    long countUnreadForUser(@Param("userId") Long userId);
}
