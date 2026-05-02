import { useEffect, useState } from "react";
import Title from "../../components/title/Title.jsx";
import { getMyItems } from "../../services/api.js";
import { useMainContext } from "../../hooks/UseMain.jsx";

function Items() {
    const { configPages, setActivePage, setActiveItem } = useMainContext();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("Chargement...");

    useEffect(() => { loadItems(); }, []);

    const loadItems = async () => {
        try {
            const data = await getMyItems();
            setItems(data);
            setMessage(data.length === 0 ? "Vous n'avez pas encore d'annonce." : "");
        } catch (error) {
            setMessage(error.message);
            console.error(error);
        }
    };

    const openItem = (item) => {
        setActiveItem(item);
        setActivePage(configPages.selectedItem.id);
    };

    return (
        <div style={pageStyle}>
            <Title />
            <button style={addButtonStyle} onClick={() => setActivePage(configPages.newItem.id)}>
                + Créer une annonce
            </button>
            {message && <p style={messageStyle}>{message}</p>}
            <div style={gridStyle}>
                {items.map((item) => (
                    <div key={item.id} style={cardStyle} onClick={() => openItem(item)}>
                        <img
                            src={item.photos && item.photos.length > 0 ? item.photos[0] : "https://via.placeholder.com/300x200?text=Annonce"}
                            alt={item.title}
                            style={imageStyle}
                        />
                        <div style={contentStyle}>
                            <h3 style={titleStyle}>{item.title}</h3>
                            <p style={categoryStyle}>{item.category}</p>
                            <p style={priceStyle}>{item.price} €</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const pageStyle = { minHeight: "100vh", backgroundColor: "#FAFAFA", padding: "20px", paddingBottom: "95px", boxSizing: "border-box" };
const addButtonStyle = { width: "100%", height: "52px", marginTop: "20px", marginBottom: "20px", border: "none", borderRadius: "28px", backgroundColor: "#587950", color: "white", fontSize: "15px", fontWeight: "700", boxShadow: "0 8px 20px rgba(0,0,0,0.18)", cursor: "pointer" };
const messageStyle = { textAlign: "center", color: "#587950", fontWeight: "700", marginTop: "30px" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" };
const cardStyle = { backgroundColor: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 22px rgba(0,0,0,0.12)", cursor: "pointer" };
const imageStyle = { width: "100%", height: "130px", objectFit: "cover", backgroundColor: "#DCE5D9" };
const contentStyle = { padding: "12px" };
const titleStyle = { margin: "0 0 6px 0", fontSize: "15px", color: "#353535" };
const categoryStyle = { margin: "0 0 6px 0", fontSize: "12px", color: "#777" };
const priceStyle = { margin: 0, fontSize: "15px", fontWeight: "800", color: "#587950" };

export default Items;
