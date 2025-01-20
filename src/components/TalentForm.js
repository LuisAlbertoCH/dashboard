import React, { useState, useEffect } from 'react';

const TalentForm = ({ onSave, onClose, initialData = null }) => {
  const [form, setForm] = useState({
    nombre: initialData ? initialData.Nombre : '',
    apelPaterno: initialData ? initialData.ApelPaterno : '',
    apelMaterno: initialData ? initialData.ApelMaterno : '',
    email: initialData ? initialData.Email : '',
    fotografia: initialData ? initialData.Fotografia : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, fotografia: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      Nombre: form.nombre,
      ApelPaterno: form.apelPaterno,
      ApelMaterno: form.apelMaterno,
      Email: form.email,
      Fotografia: form.fotografia,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
      </label>
      <label>
        Apellido Paterno:
        <input type="text" name="apelPaterno" value={form.apelPaterno} onChange={handleChange} required />
      </label>
      <label>
        Apellido Materno:
        <input type="text" name="apelMaterno" value={form.apelMaterno} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Fotografía:
        <input type="file" name="fotografia" onChange={handleFileChange} accept="image/*" />
        {form.fotografia && <img src={form.fotografia} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
      </label>
      <div className="modal-buttons">
  <button type="submit">Guardar</button>
  <button type="button" onClick={onClose}>Cancelar</button>
</div>
    </form>
  );
};

export default TalentForm;
