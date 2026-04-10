import React, { useState } from 'react';
import './conversation.css';
import { useMainContext } from "../../hooks/UseMain.jsx";

function Conversation() {
    const { setActivePage, configPages } = useMainContext();
    const [messages, setMessages] = useState([
        { id: 1, text: "Salut ! Ton livre de maths est toujours dispo ?", sender: "other" },
        { id: 2, text: "Oui ! On peut se voir devant la BU ?", sender: "me" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== "") {
            setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
            setNewMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button onClick={() => setActivePage(configPages.conversations.id)} className="back-btn"> ← </button>
                <h3>Discussion</h3>
                <div className="notif-dot"></div>
            </div>

            <div className="messages-list">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
                <label className="photo-btn">
                    📷
                    <input type="file" style={{ display: 'none' }} onChange={() => alert("Image sélectionnée !")} />
                </label>
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