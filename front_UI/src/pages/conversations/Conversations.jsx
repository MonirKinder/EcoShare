import Title from "../../components/title/Title.jsx";
import { useMainContext } from "../../hooks/UseMain.jsx";

function Conversations() {
    const { setActivePage } = useMainContext();

    const chatList = [
        { id: 1, name: "Monir Kinder", lastMsg: "Ton livre est dispo ?" },
        { id: 2, name: "Melina ADEL", lastMsg: "Ok pour demain !" }
    ];

    return (
        <div>
            <Title />
            <div style={{ padding: '20px' }}>
                <h2 style={{ color: '#587950' }}>Mes messages</h2>
                {chatList.map(chat => (
                    <div 
                        key={chat.id} 
                        onClick={() => setActivePage(99)} 
                        style={{ borderBottom: '1px solid #eee', padding: '15px 10px', cursor: 'pointer' }}
                    >
                        <strong>{chat.name}</strong>
                        <p style={{ fontSize: '0.9em', color: 'gray', margin: '5px 0 0' }}>{chat.lastMsg}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Conversations;