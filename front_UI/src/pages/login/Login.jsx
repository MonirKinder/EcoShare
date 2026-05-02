import InputLogin from "../../components/InputLogin.jsx";
import {useState} from "react";
import GoBackButton from "../../assets/GoBackButton.jsx";
import Button from "../../components/Button.jsx";
import { useMainContext } from "../../hooks/UseMain.jsx"
import { login } from "../../services/api.js";

function Login() {
    const { setActivePage, configPages, setCurrentUser } = useMainContext();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    function updateFormData(k, v) {
        setFormData({...formData, [k]: v});
    }

    const handleLogin = async () => {
        setError("");
        try {
            const data = await login({ email: formData.email, password: formData.password });
            const user = { id: data.userId, name: data.name, email: data.email };
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            setActivePage(configPages.catalogue.id);
        } catch (err) {
            setError("Email ou mot de passe incorrect.");
        }
    };

    const inputs = [
        { name: "email", type: "email", placeholder: "Adresse e-mail" },
        { name: "password", type: "password", placeholder: "Mot de passe" },
    ];

    return (
        <div className={'container'}>
            <div style={{ justifyContent: 'left', alignItems: 'start', width: '100%' }}>
                <div style={{cursor: 'pointer'}} onClick={() => setActivePage(configPages.welcome.id)}>
                    <GoBackButton />
                </div>
            </div>
            <h1>Se connecter</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {inputs.map((item, index) => (
                    <InputLogin key={index} el={item} value={formData[item.name]} onChange={updateFormData}/>
                ))}
            </div>
            {error && <p style={{ color: '#ffcccc', fontSize: '0.9em', marginTop: '10px' }}>{error}</p>}
            <div style={{ marginTop: '20px' }}>
                <Button title={'Se connecter'} onClick={handleLogin} />
            </div>
        </div>
    )
}

export default Login;