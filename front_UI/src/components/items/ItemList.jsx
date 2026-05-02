import ItemCard from "./ItemCard.jsx"

function ItemList({ items, loading }) {
    if (loading) return <p style={{ textAlign: 'center', color: '#888' }}>Chargement...</p>;
    if (!items || items.length === 0) return <p style={{ textAlign: 'center', color: '#888' }}>Aucune annonce disponible.</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '20px', paddingBottom: '120px' }}>
            {items.map((item, index) => (
                <ItemCard item={item} key={index} />
            ))}
        </div>
    )
}

export default ItemList;