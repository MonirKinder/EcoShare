import Avatar_0 from "../assets/avatars/Avatar_0.jsx";
import MessagerieIcon from "../assets/MessagerieIcon.jsx";
import { useMainContext } from "../hooks/UseMain.jsx";

function SellerCard() {
    const { activeItem, currentUser, setActiveConversation, setActivePage } = useMainContext();

    const seller = activeItem?.vendeur;
    const isMine = seller?.id === currentUser?.id;

    const handleContact = () => {
        if (!currentUser) {
            alert("Connectez-vous pour envoyer un message.");
            return;
        }
        if (isMine) return; // tu peux pas te contacter toi-même
        setActiveConversation({
            itemId: activeItem.id,
            otherUserId: seller.id,
            otherUserName: seller.name,
            itemTitle: activeItem.title,
        });
        setActivePage(99);
    };

    return (
        <div style={{
            display: 'flex',
            width: 'auto',
            margin: '16px 24px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '6px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '20px',
            }}>
                <div><Avatar_0 /></div>
                <div>
                    <div style={{ color: '#353535', fontSize: '14px', fontWeight: '600' }}>
                        {seller?.name ?? 'Vendeur'}
                    </div>
                    <div style={{ color: '#353535', fontSize: '14px', fontWeight: '400' }}>
                        {seller?.location ?? ''}
                    </div>
                </div>
            </div>

            {!isMine && (
                <div onClick={handleContact} style={{ cursor: 'pointer' }}>
                    <MessagerieIcon />
                </div>
            )}
        </div>
    )
}

export default SellerCard;