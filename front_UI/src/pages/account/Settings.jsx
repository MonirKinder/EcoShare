import Title from "../../components/title/Title.jsx";
import "../../components/components.css"
import { useState } from "react";
import InputLogin from "../../components/InputLogin.jsx";
import AvatarMain from "../../assets/avatars/AvatarMain.jsx";
import Button from "../../components/Button.jsx";
import { useMainContext } from "../../hooks/UseMain.jsx";
import { updateUser } from "../../services/api.js";

function Settings() {
    const { setActivePage, configPages, currentUser, setCurrentUser } = useMainContext();
    const [formData, setFormData] = useState({
        username: currentUser?.name ?? "",
        location: "",
        currentPassword: "",
        newPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function updateFormData(k, v) {
        setFormData({ ...formData, [k]: v });
    }

    const handleSave = async () => {
        setError(""); setSuccess("");
        try {
            const payload = {
                name: formData.username,
                location: formData.location,
            };
            if (formData.newPassword) {
                payload.currentPassword = formData.currentPassword;
                payload.newPassword = formData.newPassword;
            }
            const updated = await updateUser(payload);
            // Persist updated name
            const newUser = { ...currentUser, name: updated.name };
            localStorage.setItem('user', JSON.stringify(newUser));
            setCurrentUser(newUser);
            setSuccess("Profil mis à jour !");
        } catch (err) {
            setError(err.message ?? "Erreur lors de la mise à jour.");
        }
    };

    const inputs = [
        { name: "username", type: "text", placeholder: "Nom d'utilisateur" },
        { name: "location", type: "text", placeholder: "Université / Ville" },
        { name: "currentPassword", type: "password", placeholder: "Mot de passe actuel" },
        { name: "newPassword", type: "password", placeholder: "Nouveau mot de passe" },
    ];

    return (
        <div>
            <Title />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <div><AvatarMain /></div>
                {inputs.map((item, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: '#FFF', fontSize: '16px', fontWeight: '600' }}>
                        {item.placeholder}
                        <InputLogin el={item} value={formData[item.name]} onChange={updateFormData} />
                    </div>
                ))}
                {error && <p style={{ color: '#ffcccc', fontSize: '0.9em' }}>{error}</p>}
                {success && <p style={{ color: '#ccffcc', fontSize: '0.9em' }}>{success}</p>}
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                    <Button title={'Sauvegarder'} onClick={handleSave} />
                    <button onClick={() => setActivePage(configPages.account.id)}
                        style={{ background: 'transparent', color: '#FFF', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '32px', padding: '14px 40px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;