import './title.css'
import GoBackButton from "../../assets/GoBackButton.jsx";
import CompteIcon from "../../assets/CompteIcon.jsx";
import SettingsIcon from "../../assets/SettingsIcon.jsx";
import PlusIcon from "../../assets/PlusIcon.jsx";
import {useEffect, useState} from "react";
import {useMainContext} from "../../hooks/UseMain.jsx";

function Title() {

    const { configPages, setActivePage, activePage } = useMainContext()

    const [page, setPage] = useState(null);

    useEffect(() => {
        Object.entries(configPages).forEach(([page, settings]) => {
            console.log(page, settings);
            if (settings.id === activePage) {
                setPage(page);
            }
        })
    }, [])
    return (
        <div className="title-parent">
            {page && <>
                <div className="title-left-icon">
                    {configPages[page].hasLeftIcon && <GoBackButton isNotWhite={true}/>}
                </div>


                <div className="title-text" style={{color: page === 'settings' ? '#FFF' : '#353535'}}>
                    {configPages[page].title}
                </div>


                <div className="title-right-icon">
                    {configPages[page].hasRightIconPlus && <PlusIcon/>}
                    {configPages[page].hasRightIconSettings && <span onClick={() => {
                        setActivePage(configPages.settings.id)
                    }}> <SettingsIcon/> </span>}
                </div>
            </>}
        </div>
    )
}

export default Title;