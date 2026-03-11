import React, { useState } from 'react';
import { login } from "../services/api.js";
import { useMainContext } from "../hooks/UseMain.jsx"; 

const Login = () => {
    
    const { configPages, setActivePage } = useMainContext();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login({ email, password });
            console.log("Token reçu et stocké :", token);
            
            
            setActivePage(configPages.catalogue.id);
            
        } catch (error) {
            alert("Erreur : " + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;