import { useState, useEffect, useCallback } from "react";
import Title from "../../components/title/Title.jsx";
import InputSearch from "../../components/InputSearch.jsx";
import FilterIcon from "../../assets/FilterIcon.jsx";
import ItemList from "../../components/items/ItemList.jsx";
import { getItems, searchItems } from "../../services/api.js";

function Catalogue() {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const fetcher = query.trim().length >= 2 ? searchItems(query.trim()) : getItems();
            fetcher
                .then(data => { setItems(data); setLoading(false); })
                .catch(err => { console.error(err); setLoading(false); });
        }, 350);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            <Title />
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <InputSearch value={query} onChange={setQuery} />
                <span style={{ marginRight: "20px" }}><FilterIcon /></span>
            </div>
            <div>
                <h2>Recommandations</h2>
                <ItemList items={items} loading={loading} />
            </div>
        </div>
    )
}

export default Catalogue