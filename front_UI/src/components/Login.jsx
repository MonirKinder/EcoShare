import React, { useState } from 'react';
import { login } from "../services/api.js";
import { useMainContext } from "../hooks/UseMain.jsx"; 

const Login = () => {
    const { configPages, setActivePage, setCurrentUser } = useMainContext();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            
            const data = await login({ email, password });

            
            const user = { id: data.userId, name: data.name, email: data.email };
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);

            setActivePage(configPages.catalogue.id);
        } catch (err) {
            setError("Email ou mot de passe incorrect.");
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
                {error && <p style={{ color: 'red', fontSize: '0.9em' }}>{error}</p>}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;