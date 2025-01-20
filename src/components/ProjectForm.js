import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSave, onClose, initialData = null, talentos = [] }) => {
  const [form, setForm] = useState({
    nombreProyecto: initialData ? initialData.NombreProyecto : '',
    descripcion: initialData ? initialData.Descripcion : '',
    fechaInicio: initialData ? initialData.FechaInicio : '',
    fechaFin: initialData ? initialData.FechaFin : '',
    talentosSeleccionados: initialData && initialData.Talentos ? [...initialData.Talentos] : [],
    presupuesto: initialData ? initialData.Presupuesto : '',
    ingreso: initialData ? initialData.Ingreso : '',
    pago: initialData ? initialData.Pago : false,
    estatus: initialData ? initialData.Estatus : 'Pendiente',
  });

  console.log("Estado inicial del formulario: ", form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setForm((prev) => ({ ...prev, pago: !prev.pago }));
  };

  const handleSelectChange = (e) => {
    // Seleccionamos los IDs de los talentos seleccionados
    const selectedTalents = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log("Talentos seleccionados: ", selectedTalents); // Log para verificar
    setForm((prev) => ({ ...prev, talentosSeleccionados: selectedTalents }));
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      NombreProyecto: form.nombreProyecto,
      Descripcion: form.descripcion,
      FechaInicio: form.fechaInicio,
      FechaFin: form.fechaFin,
      Talentos: form.talentosSeleccionados,
      Presupuesto: parseFloat(form.presupuesto) || 0,
      Ingreso: parseFloat(form.ingreso) || 0,
      Pago: form.pago,
      Estatus: form.estatus,
      Fotografia: initialData ? initialData.Fotografia : form.fotografia,  // Mantener la imagen actual si no se cambia
    });
  };  
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Proyecto:
        <input type="text" name="nombreProyecto" value={form.nombreProyecto} onChange={handleChange} required />
      </label>
      <label>
        Descripción:
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
      </label>
      <label>
        Fecha de Inicio:
        <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
      </label>
      <label>
        Fecha de Fin:
        <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
      </label>
      <label>
        Presupuesto:
        <input type="number" name="presupuesto" value={form.presupuesto} onChange={handleChange} min="0" required />
      </label>
      <label>
        Ingreso:
        <input type="number" name="ingreso" value={form.ingreso} onChange={handleChange} />
      </label>
      <label>
        Talentos:
        <select multiple name="talentosSeleccionados" value={form.talentosSeleccionados} onChange={handleSelectChange}>
          {talentos.map((talento) => (
            <option key={talento._id} value={talento._id}>
              {talento.Nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        Pago:
        <input type="checkbox" checked={form.pago} onChange={handleCheckboxChange} />
      </label>
      <label>
        Estatus:
        <select name="estatus" value={form.estatus} onChange={handleChange}>
          <option value="Pendiente">Pendiente</option>
          <option value="En Desarrollo">En Desarrollo</option>
          <option value="Retrasado">Retrasado</option>
          <option value="Entregado">Entregado</option>
        </select>
      </label>
      <div className="modal-buttons">
  <button type="submit">Guardar</button>
  <button type="button" onClick={onClose}>Cancelar</button>
</div>
    </form>
  );
};

export default ProjectForm;
