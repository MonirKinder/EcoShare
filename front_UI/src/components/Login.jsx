import React, { useState } from 'react';
import { login } from '../services/api'; 
import { useMainContext } from "../hooks/UseMain.jsx"; // Ajout de l'import du contexte

const Login = () => {
    // On récupère les outils pour changer de page
    const { configPages, setActivePage } = useMainContext();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login({ email, password });
            console.log("Token reçu et stocké :", token);
            
            // REDIRECTION : On change la page active vers le catalogue
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