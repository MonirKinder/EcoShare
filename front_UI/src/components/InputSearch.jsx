import {useState, useEffect} from "react";

function InputSearch() {
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        console.log(searchText);
    }, [searchText]);
    return (
        <div>
            <input
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className={'inputSearch'}
                placeholder={'Rechercher'}/>
        </div>
    )
}

export default InputSearch;