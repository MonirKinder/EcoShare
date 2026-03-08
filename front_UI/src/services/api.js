const API_URL = "http://localhost:8080/api";

/**
 * Récupère le header d'autorisation avec le JWT stocké
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// --- AUTHENTIFICATION ---

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Erreur lors de l'inscription");
    return response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error("Identifiants incorrects");

    const token = await response.text();
    localStorage.setItem('token', token); // Stockage du badge de sécurité
    return token;
};

// --- ANNONCES ET IMAGES ---

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        // Pas de Content-Type ici, le navigateur le gère pour FormData
        body: formData,
    });
    if (!response.ok) throw new Error("Échec de l'upload");
    return response.text(); // Retourne le chemin du fichier (ex: /uploads/xxx.jpg)
};

export const createItem = async (itemData) => {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders() // Ajoute automatiquement le Bearer Token
        },
        body: JSON.stringify(itemData)
    });
    if (!response.ok) throw new Error("Erreur lors de la création de l'annonce");
    return response.json();
};
