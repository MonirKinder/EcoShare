import Avatar_0 from "../assets/avatars/Avatar_0.jsx";
import MessagerieIcon from "../assets/MessagerieIcon.jsx";

function SellerCard() {
    return(
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
                <div>
                    <Avatar_0 />
                </div>

                <div>
                    <div style={{
                        color: '#353535',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}>
                        Pauline Brazier
                    </div>
                    <div style={{
                        color: '#353535',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>
                        Université Paris-Saclay
                    </div>

                </div>
            </div>

            <div>
                <MessagerieIcon />
            </div>

        </div>
    )
}

export default SellerCard;