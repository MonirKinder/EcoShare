import "./title.css";
import GoBackButton from "../../assets/GoBackButton.jsx";
import SettingsIcon from "../../assets/SettingsIcon.jsx";
import PlusIcon from "../../assets/PlusIcon.jsx";
import { useMainContext } from "../../hooks/UseMain.jsx";

function Title() {
    const { configPages, setActivePage, activePage } = useMainContext();

    const pageKey = Object.keys(configPages).find(key => configPages[key].id === activePage);
    if (!pageKey) return null;
    const page = configPages[pageKey];

    return (
        <div className="title-parent">
            <div
                className="title-left-icon"
                onClick={() => page.hasLeftIcon && setActivePage(configPages.account.id)}
                style={{ cursor: page.hasLeftIcon ? "pointer" : "default" }}
            >
                {page.hasLeftIcon && <GoBackButton isNotWhite={true} />}
            </div>

            <div className="title-text" style={{ color: pageKey === "settings" ? "#FFF" : "#353535" }}>
                {page.title}
            </div>

            <div className="title-right-icon">
                {page.hasRightIconPlus && (
                    <span onClick={() => setActivePage(configPages.newItem.id)} style={{ cursor: "pointer" }}>
                        <PlusIcon />
                    </span>
                )}
                {page.hasRightIconSettings && (
                    <span onClick={() => setActivePage(configPages.settings.id)} style={{ cursor: "pointer" }}>
                        <SettingsIcon />
                    </span>
                )}
            </div>
        </div>
    );
}

export default Title;
