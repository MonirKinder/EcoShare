import Button from "../../components/Button.jsx";
import Title from "../../components/title/Title.jsx";
import InputSearch from "../../components/InputSearch.jsx";
import FilterIcon from "../../assets/FilterIcon.jsx";
import ItemList from "../../components/items/ItemList.jsx";

function Catalogue() {
    return (
        <div>
            <Title />

            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}} >
                <InputSearch />
                <span style={{marginRight: "20px"}}><FilterIcon /></span>
            </div>

            <div>
                <h2>Recommendations</h2>
                <div>

                    <div>
                        <ItemList />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Catalogue