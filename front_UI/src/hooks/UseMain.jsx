import {useContext, Provider, useState, createContext} from "react"

const MainContext = createContext(null)

function MainProvider({children}) {

    const indexMenuInPages = [4, 5, 6, 8, 10, 11, 12]

    const configPages = {
        'welcome': {
            id: 1
        },
        'login': {
            id: 2
        },
        'signIn': {
            id: 3
        },
        'catalogue': {
            id: 4,
            title: 'Catalogue',
        },
        'item': {
            id: 5,
        },
        'conversations': {
            id: 6,
            title: 'Messagerie'
        },
        'conversation': {
            id: 7,
            title: 'message (changer!)'
        },
        'account': {
            id: 8,
            title: 'Compte',
            hasRightIconSettings: true,
        },
        'settings': {
            id: 9,
            title: 'Paramètres'
        },
        'items': {
            id: 10,
            title: 'Mes annonces',
            hasLeftIcon: true,
            hasRightIconPlus: true,
        },
        'selectedItem': {
            id: 11,
        },
        'newItem': {
            id: 12,
            title: 'Nouvelle annonce',
            hasLeftIcon: true,
        }
    }

    const [activePage, setActivePage] = useState(() => {
        return localStorage.getItem('user') === null
            ? configPages.welcome.id
            : configPages.catalogue.id
    })

    const [activeItem, setActiveItem] = useState(null)

    const value = {
        activePage, setActivePage,
        activeItem, setActiveItem,
        configPages,
        indexMenuInPages,
    }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
}

// 3. Хук для удобного использоSвания
function useMainContext() {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error("useAppContext must be used inside AppProvider");
    }
    return context;
}

export {MainProvider, useMainContext}