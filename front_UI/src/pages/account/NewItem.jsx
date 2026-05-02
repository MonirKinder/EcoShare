import { useState } from "react";
import Title from "../../components/title/Title.jsx";
import { createItem, uploadImage } from "../../services/api.js";

function NewItem() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        tags: ""
    });

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setMessage("Veuillez choisir une image.");
            return;
        }
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
        setMessage("");
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setMessage("");

            if (!form.title.trim()) throw new Error("Le titre est obligatoire.");
            if (!form.category.trim()) throw new Error("La catégorie est obligatoire.");
            if (!form.price || Number(form.price) <= 0) throw new Error("Le prix doit être supérieur à 0.");

            let photos = [];
            if (photoFile) {
                const uploaded = await uploadImage(photoFile);
                photos = [uploaded.url];
            }

            await createItem({
                title: form.title.trim(),
                description: form.description.trim(),
                price: Number(form.price),
                category: form.category.trim(),
                tags: form.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
                photos
            });

            setMessage("Annonce créée avec succès 🎉");
            setForm({ title: "", description: "", price: "", category: "", tags: "" });
            setPhotoFile(null);
            setPhotoPreview(null);

        } catch (error) {
            setMessage(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <Title />
            <div style={formStyle}>
                <input name="title" placeholder="Nom de l'annonce" value={form.title} onChange={handleChange} style={inputStyle} />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={inputStyle} />
                <input name="price" type="number" placeholder="Prix" value={form.price} onChange={handleChange} style={inputStyle} />
                <input name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} style={inputStyle} />
                <input name="tags" placeholder="Tags séparés par des virgules" value={form.tags} onChange={handleChange} style={inputStyle} />

                <label style={photoBoxStyle}>
                    {photoPreview ? (
                        <img src={photoPreview} alt="Aperçu" style={previewStyle} />
                    ) : (
                        <>
                            <span style={plusStyle}>＋</span>
                            <span style={photoTextStyle}>Ajouter une photo</span>
                        </>
                    )}
                    <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                </label>

                <button onClick={handleSubmit} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                    {loading ? "Création..." : "Créer l'annonce"}
                </button>

                {message && <p style={messageStyle}>{message}</p>}
            </div>
        </div>
    );
}

const pageStyle = { minHeight: "100vh", backgroundColor: "#FAFAFA", padding: "20px", paddingBottom: "95px", boxSizing: "border-box" };
const formStyle = { marginTop: "25px" };
const inputStyle = { width: "100%", height: "55px", marginBottom: "14px", padding: "0 24px", border: "none", borderRadius: "28px", backgroundColor: "white", boxShadow: "0 8px 22px rgba(0,0,0,0.10)", fontSize: "15px", outline: "none", boxSizing: "border-box" };
const photoBoxStyle = { height: "140px", marginTop: "8px", marginBottom: "32px", borderRadius: "18px", backgroundColor: "#DCE5D9", border: "5px solid white", boxShadow: "0 8px 22px rgba(0,0,0,0.16)", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "#587950", fontWeight: "700", cursor: "pointer", overflow: "hidden" };
const previewStyle = { width: "100%", height: "100%", objectFit: "cover" };
const plusStyle = { fontSize: "28px", fontWeight: "300" };
const photoTextStyle = { fontSize: "15px" };
const buttonStyle = { width: "100%", height: "55px", border: "none", borderRadius: "28px", backgroundColor: "#587950", color: "white", fontSize: "15px", fontWeight: "700", boxShadow: "0 8px 20px rgba(0,0,0,0.20)", cursor: "pointer" };
const messageStyle = { textAlign: "center", marginTop: "15px", color: "#587950", fontWeight: "700" };

export default NewItem;
