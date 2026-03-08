import InputLogin from "../../components/InputLogin.jsx";
import {useState} from "react";
import GoBackButton from "../../assets/GoBackButton.jsx";
import Button from "../../components/Button.jsx";
import {useMainContext} from "../../hooks/UseMain.jsx";

function SignIn() {

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
        {
            name: "passwordConfirmation",
            type: "password",
            placeholder: "Confirmer le mot de passe"
        }
    ]
    return (
        <div className={'container'}>
            <div style={{
                justifyContent: 'left',
                alignItems: 'start',
                width: '100%'
            }}>
                <div style={{cursor: 'pointer'}} onClick={() => setActivePage(configPages.welcome.id)}>
                    <GoBackButton />
                </div>

            </div>
            <h1>Créer un compte</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {
                    inputs.map((item, index) => (
                        <InputLogin key={index} el={item} value={formData[item.name]} onChange={updateFormData}/>
                    ))
                }
            </div>
            <div style={{
                marginTop: '20px'
            }}>
                <Button title={'Créer le compte'} onClick={()=> setActivePage(configPages.login.id)} />
            </div>
        </div>
    )
}

export default SignIn;