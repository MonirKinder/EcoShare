import { useEffect, useState } from "react";
import HeartIcon from "../../assets/HeartIcon.jsx";
import './itemCard.css'
import {useMainContext} from "../../hooks/UseMain.jsx";

function ItemCard({item, isSmall}) {
    const { setActiveItem, setActivePage, configPages } = useMainContext()
    return (
        <div className="card-background" onClick={() => {
                setActiveItem(item);
                setActivePage(configPages.item.id)}}>
            <div className="card-content">
                <div className="card-left">
                    {/* FIX: backend photos are stored as "/uploads/filename", not "/images/filename"
                        Vite proxy forwards /uploads/* to http://localhost:8080/uploads/* */}
                    <img style={{width: '102px',
                        height: '76px',
                        aspectRatio: 51/38,
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        borderRadius: '20px'}}
                         src={item.photos && item.photos.length > 0 ? item.photos[0] : '/placeholder.png'}
                         alt={"Annonce"} />
                </div>
                <div className="card-right">
                    <div className="card-text">
                        <div className="card-header">
                            {item.title}
                        </div>
                        <div className="card-price">
                            {item.price}€
                        </div>
                        <div className="card-category">
                            {item.category}
                        </div>
                    </div>
                    <div className="card-like">
                        <HeartIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;