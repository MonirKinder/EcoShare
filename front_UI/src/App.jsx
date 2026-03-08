import {useState} from 'react';
import Welcome from './pages/login/Welcome.jsx';
import Catalogue from "./pages/catalogue/Catalogue.jsx";
import Conversations from "./pages/conversations/Conversations.jsx";
import Account from "./pages/account/Account.jsx";
import Settings from "./pages/account/Settings.jsx";
import BottomMenu from "./components/bottom_menu/BottomMenu.jsx";
import SignIn from "./pages/login/SignIn.jsx";
import Item from "./pages/catalogue/Item.jsx";
import Login from './components/Login'; // L'unique import Login

import { useMainContext } from "./hooks/UseMain.jsx";

import './style.css'

function App() {

    const {configPages, activePage, setActivePage} = useMainContext();

    function setActiveItem(data) {
        configPages.item.activeItem = data;
    }

    const indexMenuInPages = [4, 5, 6, 8, 10, 11, 12]

    return (
        <div
            style={{
                backgroundColor: activePage <= 3 || activePage === 9 ? '#587950' : '#FFF',
                paddingTop:'1px',
                height:'100vh'
        }}>
            {/* On force l'affichage du Login pour le test */}


            {activePage === configPages.welcome.id && <Welcome />}
            {activePage === configPages.login.id && <Login />}
            {activePage === configPages.signIn.id && <SignIn />}
            {activePage === configPages.catalogue.id && <Catalogue />}
            {activePage === configPages.item.id && <Item />}
            {activePage === configPages.conversations.id && <Conversations />}
            {activePage === configPages.account.id && <Account />}
            {activePage === configPages.settings.id && <Settings />}

            {indexMenuInPages.includes(activePage) ? <BottomMenu  /> : null}
        </div>
    )
}

export default App
