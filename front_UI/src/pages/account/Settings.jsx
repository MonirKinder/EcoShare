import Title from "../../components/title/Title.jsx";
import "../../components/components.css"
import {useState} from "react";
import InputLogin from "../../components/InputLogin.jsx";
import AvatarMain from "../../assets/avatars/AvatarMain.jsx";
import Button from "../../components/Button.jsx";
import {useMainContext} from "../../hooks/UseMain.jsx";

function Settings() {

    const { setActivePage, configPages } = useMainContext()

    const [formData, setFormData] = useState({
        username: "",
        location: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    function updateFormData(k, v) {
        setFormData({...formData, [k]:v});
    }
    const inputs = [
        {
            name: "username",
            type: "text",
            placeholder: "Nom d'utilisateur"
        },
        {
            name: "location",
            type: "text",
            placeholder: "Université / Ville"
        },
        {
            name: "email",
            type: "email",
            placeholder: "Adresse e-mail"
        },
        {
            name: "password",
            type: "password",
            placeholder: "Mot de passe"
        },
    ]
    return (
        <div>
            <div>
                <Title />
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
                <div>
                    <AvatarMain />
                </div>
                {
                    inputs.map((item, index) => (
                        <div key={index} style={{display: 'flex', flexDirection: 'column', gap: '5px', color: '#FFF', fontSize: '16px', fontWeight: '600'}}>
                            {item.placeholder}
                            <InputLogin el={item} value={formData[item.name]} onChange={updateFormData}/>
                        </div>
                    ))
                }
                <div style={{marginTop: '20px'}}>
                    <Button title={'Terminer'} onClick={() => setActivePage(configPages.catalogue.id)}/>
                </div>
            </div>

        </div>
    )
}

export default Settings;