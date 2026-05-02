import Title from "../../components/title/Title.jsx";
import { useMainContext } from "../../hooks/UseMain.jsx";

function Account() {
    const { currentUser, logout, configPages, setActivePage } = useMainContext();

    return (
        <div>
            <Title />
            <div style={{ padding: '20px' }}>
                {currentUser ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h2 style={{ color: '#587950', margin: '0 0 8px' }}>Mon compte</h2>
                        <div style={{ background: '#f5f5f5', borderRadius: '12px', padding: '16px' }}>
                            <p style={{ margin: '4px 0' }}><strong>Nom :</strong> {currentUser.name}</p>
                            <p style={{ margin: '4px 0' }}><strong>Email :</strong> {currentUser.email}</p>
                        </div>
                        <button
                            onClick={() => setActivePage(configPages.items.id)}
                            style={{ background: '#587950', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Mes annonces
                        </button>
                        <button
                            onClick={logout}
                            style={{ background: 'transparent', color: '#587950', border: '2px solid #587950', borderRadius: '12px', padding: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Se déconnecter
                        </button>
                    </div>
                ) : (
                    <p style={{ color: '#888' }}>Non connecté.</p>
                )}
            </div>
        </div>
    )
}

export default Account;