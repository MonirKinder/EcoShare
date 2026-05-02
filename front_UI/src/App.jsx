import Welcome from "./pages/login/Welcome.jsx";
import Catalogue from "./pages/catalogue/Catalogue.jsx";
import Conversations from "./pages/conversations/Conversations.jsx";
import Conversation from "./pages/conversations/Conversation.jsx";
import Account from "./pages/account/Account.jsx";
import Settings from "./pages/account/Settings.jsx";
import BottomMenu from "./components/bottom_menu/BottomMenu.jsx";
import SignIn from "./pages/login/SignIn.jsx";
import Item from "./pages/catalogue/Item.jsx";
import Login from "./pages/login/Login.jsx";
import Items from "./pages/account/Items.jsx";
import NewItem from "./pages/account/NewItem.jsx";
import SelectedItem from "./pages/account/SelectedItem.jsx";
import { useMainContext } from "./hooks/UseMain.jsx";
import "./style.css";

function App() {
    const { configPages, activePage } = useMainContext();
    const indexMenuInPages = [
        configPages.catalogue.id,
        configPages.item.id,
        configPages.conversations.id,
        configPages.account.id,
        configPages.items.id,
        configPages.selectedItem.id,
        configPages.newItem.id,
        99
    ];

    return (
        <div style={{
            backgroundColor: activePage <= 3 || activePage === 9 ? "#587950" : "#FFF",
            paddingTop: "1px",
            minHeight: "100vh"
        }}>
            {activePage === configPages.welcome.id && <Welcome />}
            {activePage === configPages.login.id && <Login />}
            {activePage === configPages.signIn.id && <SignIn />}
            {activePage === configPages.catalogue.id && <Catalogue />}
            {activePage === configPages.item.id && <Item />}
            {activePage === configPages.account.id && <Account />}
            {activePage === configPages.settings.id && <Settings />}
            {activePage === configPages.items.id && <Items />}
            {activePage === configPages.newItem.id && <NewItem />}
            {activePage === configPages.selectedItem.id && <SelectedItem />}
            {activePage === configPages.conversations.id && <Conversations />}
            {activePage === 99 && <Conversation />}
            {indexMenuInPages.includes(activePage) && <BottomMenu />}
        </div>
    );
}

export default App;
