import { useEffect, useState } from "react";
import Title from "../../components/title/Title.jsx";
import { useMainContext } from "../../hooks/UseMain.jsx";
import { getConversations } from "../../services/api.js";

function Conversations() {
    const { setActivePage, setActiveConversation, configPages } = useMainContext();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // FIX: load real conversations from the backend
        getConversations()
            .then(data => {
                setConversations(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const openConversation = (conv) => {
        setActiveConversation({
            itemId: conv.itemId,
            otherUserId: conv.otherUserId,
            otherUserName: conv.otherUserName,
            itemTitle: conv.itemTitle,
        });
        setActivePage(99);
    };

    return (
        <div>
            <Title />
            <div style={{ padding: '20px' }}>
                <h2 style={{ color: '#587950' }}>Mes messages</h2>
                {loading && <p style={{ color: '#888' }}>Chargement...</p>}
                {!loading && conversations.length === 0 && (
                    <p style={{ color: '#888' }}>Aucune conversation pour l'instant.</p>
                )}
                {conversations.map((conv, i) => (
                    <div
                        key={i}
                        onClick={() => openConversation(conv)}
                        style={{ borderBottom: '1px solid #eee', padding: '15px 10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <div>
                            <strong>{conv.otherUserName}</strong>
                            <p style={{ fontSize: '0.85em', color: '#587950', margin: '2px 0' }}>{conv.itemTitle}</p>
                            <p style={{ fontSize: '0.9em', color: 'gray', margin: '5px 0 0' }}>{conv.lastMessage}</p>
                        </div>
                        {conv.unreadCount > 0 && (
                            <span style={{
                                backgroundColor: '#587950',
                                color: 'white',
                                borderRadius: '50%',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75em',
                                fontWeight: 'bold'
                            }}>
                                {conv.unreadCount}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Conversations;