import React, { useState, useEffect, useRef } from 'react';
import './conversation.css';
import { useMainContext } from "../../hooks/UseMain.jsx";
import { getConversation, sendMessage } from "../../services/api.js";

function Conversation() {
    const { setActivePage, configPages, activeConversation, currentUser } = useMainContext();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!activeConversation) return;
        
        getConversation(activeConversation.itemId, activeConversation.otherUserId)
            .then(data => {
                setMessages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [activeConversation]);

    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        try {
           
            const sent = await sendMessage({
                itemId: activeConversation.itemId,
                toUserId: activeConversation.otherUserId,
                content: newMessage.trim()
            });
            setMessages(prev => [...prev, sent]);
            setNewMessage("");
        } catch (err) {
            alert("Erreur lors de l'envoi : " + err.message);
        }
    };

    
    const isMe = (msg) => msg.fromUser?.id === currentUser?.id;

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button onClick={() => setActivePage(configPages.conversations.id)} className="back-btn"> ← </button>
                <div>
                    <h3 style={{ margin: 0 }}>{activeConversation?.otherUserName ?? 'Discussion'}</h3>
                    {activeConversation?.itemTitle && (
                        <p style={{ margin: 0, fontSize: '0.8em', color: '#888' }}>{activeConversation.itemTitle}</p>
                    )}
                </div>
                <div className="notif-dot"></div>
            </div>

            <div className="messages-list">
                {loading && <p style={{ textAlign: 'center', color: '#888' }}>Chargement...</p>}
                {!loading && messages.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#888' }}>Commencez la conversation !</p>
                )}
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${isMe(msg) ? 'me' : 'other'}`}>
                        {msg.content}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn">Envoyer</button>
            </form>
        </div>
    );
}

export default Conversation;