import GoBackButton from "../../assets/GoBackButton.jsx";
import {useMainContext} from "../../hooks/UseMain.jsx";
import SellerCard from "../../components/SellerCard.jsx";
import {useState} from "react";
import "./slider.css"
import ItemDescription from "../../components/ItemDescription.jsx";


function Slider ({images}) {

    const [index, setIndex] = useState(0);

    return (
        <div className="slider">
            <div className="slider-viewport">
                <div className="slider-track" style={{transform: `translateX(-${index * 100}%)`}}>
                    {images.map((image, index) => (
                        <div className="slider-slide" key={index}>
                            <img className="slider-image" src={`/images/${image}`} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-dots">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`slider-dot ${i === index ? "is-active" : ""}`}
                        onClick={() => setIndex(i)}>
                    </button>
                ))}
            </div>
        </div>
    )
}

function Item() {
    const { activeItem, setActivePage, setActiveItem, configPages } = useMainContext()
    console.log(activeItem)
    return (
        <div>
            <div style={{marginTop: "20px", marginLeft: "20px"}}>
                <span onClick={() => {
                    setActivePage(configPages.catalogue.id)
                    setActiveItem(null)
                }}>
                    <GoBackButton isNotWhite={true} />
                </span>
            </div>
            <div>
                <SellerCard/>
            </div>
            <div>
                <Slider images={activeItem.photos} />
            </div>
            <div>
                <ItemDescription item={activeItem} />
            </div>

        </div>
    )
}

export default Item;