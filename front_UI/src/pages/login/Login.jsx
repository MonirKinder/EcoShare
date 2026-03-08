import InputLogin from "../../components/InputLogin.jsx";
import {useState} from "react";
import GoBackButton from "../../assets/GoBackButton.jsx";
import Button from "../../components/Button.jsx";

import { useMainContext } from "../../hooks/UseMain.jsx"


function Login() {

    const { setActivePage, configPages } = useMainContext();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    function updateFormData(k, v) {
        setFormData({...formData, [k]:v});
    }
    const inputs = [
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
            <h1>Se connecter</h1>
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
                <Button title={'Se connecter'} onClick={()=> setActivePage(configPages.catalogue.id)} />
            </div>
        </div>
    )
}

export default Login;