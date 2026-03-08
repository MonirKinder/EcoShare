import './menu.css'
import CatalogueIcon from "../../assets/CatalogueIcon.jsx";
import MessagerieIcon from "../../assets/MessagerieIcon.jsx";
import CompteIcon from "../../assets/CompteIcon.jsx";
import {useEffect} from "react";
import {useMainContext} from "../../hooks/UseMain.jsx";

function BottomMenu() {

    const { activePage, setActivePage, configPages } = useMainContext()

    const indexCataloguePages = [4, 5, 10, 11, 12]
    const indexMessageriePages = [6, 7]
    const indexComptePages = [8, 9]

    function whichIsActive() {
        if (indexCataloguePages.includes(activePage)) {
            return 'Catalogue'
        } else if (indexMessageriePages.includes(activePage)) {
            return 'Messagerie'
        } else {
            return 'Compte'
        }
    }

    useEffect(() => {
        console.log('whichIsActive', whichIsActive() === 'Catalogue')
    })
    return (
        <div className="parent">
            <div className="child">
                <div className="item" onClick={() => setActivePage(configPages.catalogue.id)}>
                    <CatalogueIcon isActive={ whichIsActive() === 'Catalogue'}/>

                    <span style={{color: whichIsActive() === 'Catalogue' ? '#587950' : '#353535'}}>Catalogue</span>

                </div>

                <div className="item" onClick={() => setActivePage(configPages.conversations.id)}>
                    <MessagerieIcon isActive={whichIsActive() === 'Messagerie'}/>

                    <span style={{color: whichIsActive() === 'Messagerie' ? '#587950' : '#353535'}}>Messagerie</span>

                </div>

                <div className="item" onClick={() => setActivePage(configPages.account.id)}>

                    <CompteIcon isActive={whichIsActive() === 'Compte'}/>

                    <span style={{color: whichIsActive() === 'Compte' ? '#587950' : '#353535'}}>Compte</span>

                </div>
            </div>
        </div>
    )
}

export default BottomMenu;