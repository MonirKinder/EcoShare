const API_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ─── Auth ────────────────────────────────────────────────────────────────────

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Erreur lors de l'inscription");
    return response.json();
};

// FIX: was using response.text() → stored the raw JSON string instead of the token
export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error("Identifiants incorrects");

    const data = await response.json(); // { token, userId, name, email }
    localStorage.setItem('token', data.token);
    return data;
};

export const getMe = async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Non authentifié");
    return response.json(); // { userId, name, email, location }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// ─── Items ───────────────────────────────────────────────────────────────────

export const getItems = async () => {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error("Erreur lors du chargement des annonces");
    return response.json();
};

export const createItem = async (itemData) => {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(itemData)
    });
    if (!response.ok) throw new Error("Erreur lors de la création de l'annonce");
    return response.json();
};

export const deleteItem = async (id) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression de l'annonce");
};

// ─── Upload ──────────────────────────────────────────────────────────────────

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) throw new Error("Échec de l'upload");
    const data = await response.json();
    // Return { url } object so callers can do uploaded.url
    const url = data.url.startsWith('http') ? data.url : `http://192.168.1.89:8080${data.url}`;
    return { url };
};

// ─── Messages ────────────────────────────────────────────────────────────────

export const getConversations = async () => {
    const response = await fetch(`${API_URL}/messages/conversations`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Erreur lors du chargement des conversations");
    return response.json();
};

export const getConversation = async (itemId, otherUserId) => {
    const response = await fetch(`${API_URL}/messages/conversation?itemId=${itemId}&otherUserId=${otherUserId}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Erreur lors du chargement des messages");
    return response.json();
};

export const getMyItems = async () => {
    const response = await fetch(`${API_URL}/items/mine`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Erreur lors du chargement de vos annonces");
    return response.json();
};

export const updateItem = async (id, itemData) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(itemData)
    });
    if (!response.ok) throw new Error("Erreur lors de la modification");
    return response.json();
};

export const searchItems = async (keyword) => {
    const response = await fetch(`${API_URL}/items/search?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error("Erreur lors de la recherche");
    return response.json();
};

export const updateUser = async (userData) => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Erreur lors de la mise à jour du profil");
    return response.json();
};

export const sendMessage = async ({ itemId, toUserId, content }) => {
    const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify({ itemId, toUserId, content })
    });
    if (!response.ok) throw new Error("Erreur lors de l'envoi du message");
    return response.json();
};
