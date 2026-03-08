import "./components.css"
import HeartIcon from "../assets/HeartIcon.jsx";

function ItemDescription({item}) {
    return (
        <div>
            <div className="item-description">
                <div>
                    <div className="item-title">
                        {item.title}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                        <div className="item-price">
                            {item.price}€
                        </div>
                        <div className="item-price-commission">
                            ·
                        </div>
                        <div className="item-price-commission">
                            {item.price+1}€, commission incluse
                        </div>
                    </div>
                    <div style={{position: 'absolute', bottom: '0px', right: '32px'}}>
                        <HeartIcon size={20}/>
                    </div>
                </div>
            </div>
            <div>
                <div className="item-desc">
                    {item.description}
                </div>
            </div>
        </div>
    )
}

export default ItemDescription