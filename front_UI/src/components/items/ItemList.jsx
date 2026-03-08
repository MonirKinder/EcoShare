import {useEffect, useState} from "react";
import ItemCard from "./ItemCard.jsx"
import {useMainContext} from "../../hooks/UseMain.jsx";

function ItemList() {
    const [items, setItem] = useState(null);

    useEffect(() => {
        fetch('/data/PublishedItems.json')
            .then(res => res.json())
            .then(data => {
                setItem(data.items);
                console.log(data.items);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap:'20px', paddingBottom:'120px' }}>
            {
                items && items.length > 0 && items.map((item, index) => (
                    <ItemCard item={item} key={index}/>
                ))
            }
        </div>
    )
}

export default ItemList;