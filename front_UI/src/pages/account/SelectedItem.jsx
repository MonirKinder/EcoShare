import { useState } from "react";
import { useMainContext } from "../../hooks/UseMain.jsx";
import { updateItem, deleteItem, uploadImage } from "../../services/api.js";
import GoBackButton from "../../assets/GoBackButton.jsx";

const CATEGORIES = ["Livres", "Électronique", "Vêtements", "Sport", "Meubles", "Cuisine", "Autre"];

const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '12px',
    border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', fontFamily: 'inherit'
};

function SelectedItem() {
    const { activeItem, setActiveItem, setActivePage, configPages } = useMainContext();
    const item = activeItem;

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        title: item?.title ?? '',
        price: item?.price ?? '',
        category: item?.category ?? CATEGORIES[0],
        description: item?.description ?? '',
    });
    const [photos, setPhotos] = useState(item?.photos ?? []);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    if (!item) return null;

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handlePhotoAdd = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);
        try {
            const urls = await Promise.all(files.map(uploadImage));
            setPhotos(p => [...p, ...urls]);
        } catch { setError("Erreur upload."); }
        setUploading(false);
    };

    const handleSave = async () => {
        setSaving(true); setError('');
        try {
            const updated = await updateItem(item.id, {
                title: form.title, price: parseFloat(form.price),
                category: form.category, description: form.description,
                photos, tags: item.tags ?? []
            });
            setActiveItem(updated);
            setEditing(false);
        } catch { setError("Erreur lors de la sauvegarde."); }
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!window.confirm("Supprimer cette annonce ?")) return;
        try {
            await deleteItem(item.id);
            setActiveItem(null);
            setActivePage(configPages.items.id);
        } catch { setError("Erreur lors de la suppression."); }
    };

    return (
        <div style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 16px 0' }}>
                <span onClick={() => setActivePage(configPages.items.id)} style={{ cursor: 'pointer' }}>
                    <GoBackButton isNotWhite={true} />
                </span>
                <h2 style={{ margin: 0, color: '#353535', fontSize: '18px' }}>Mon annonce</h2>
                <div style={{ marginLeft: 'auto' }}>
                    {!editing
                        ? <button onClick={() => setEditing(true)}
                            style={{ background: '#587950', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', fontWeight: '600' }}>
                            Modifier
                          </button>
                        : <button onClick={handleSave} disabled={saving}
                            style={{ background: '#324C16', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 16px', cursor: 'pointer', fontWeight: '600' }}>
                            {saving ? '...' : 'Sauvegarder'}
                          </button>
                    }
                </div>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Photos */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {photos.map((src, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                            <img src={src} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px' }} alt="" />
                            {editing && (
                                <button onClick={() => setPhotos(p => p.filter((_, idx) => idx !== i))}
                                    style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ff5555', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', padding: 0 }}>
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                    {editing && (
                        <label style={{ width: '90px', height: '90px', borderRadius: '12px', border: '2px dashed #587950', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#587950', fontSize: '28px' }}>
                            {uploading ? '…' : '+'}
                            <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePhotoAdd} />
                        </label>
                    )}
                </div>

                {/* Fields */}
                {[
                    { label: 'Titre', key: 'title', type: 'text' },
                    { label: 'Prix (€)', key: 'price', type: 'number' },
                ].map(({ label, key, type }) => (
                    <div key={key}>
                        <p style={{ fontWeight: '600', color: '#353535', margin: '0 0 4px', fontSize: '14px' }}>{label}</p>
                        {editing
                            ? <input style={inputStyle} type={type} value={form[key]} onChange={e => update(key, e.target.value)} />
                            : <p style={{ margin: 0, color: '#555' }}>{form[key]}{key === 'price' ? '€' : ''}</p>
                        }
                    </div>
                ))}

                <div>
                    <p style={{ fontWeight: '600', color: '#353535', margin: '0 0 4px', fontSize: '14px' }}>Catégorie</p>
                    {editing
                        ? <select style={{ ...inputStyle, background: 'white' }} value={form.category} onChange={e => update('category', e.target.value)}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        : <p style={{ margin: 0, color: '#555' }}>{form.category}</p>
                    }
                </div>

                <div>
                    <p style={{ fontWeight: '600', color: '#353535', margin: '0 0 4px', fontSize: '14px' }}>Description</p>
                    {editing
                        ? <textarea style={{ ...inputStyle, height: '90px', resize: 'vertical' }} value={form.description} onChange={e => update('description', e.target.value)} />
                        : <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.4' }}>{form.description || '—'}</p>
                    }
                </div>

                {error && <p style={{ color: 'red', fontSize: '0.9em' }}>{error}</p>}

                <button onClick={handleDelete}
                    style={{ background: 'transparent', color: '#cc3333', border: '2px solid #cc3333', borderRadius: '32px', padding: '14px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
                    Supprimer l'annonce
                </button>
            </div>
        </div>
    );
}

export default SelectedItem;
