import React, { useState, useEffect } from 'react';
import TalentForm from './TalentForm';
import Modal from './Modal';
import './Tables.css';
import { 
  obtenerTalentos as getTalents, 
  agregarTalento as addTalent, 
  actualizarTalento as updateTalent, 
  eliminarTalento as deleteTalent 
} from '../services/api';

const Talents = () => {
  const [talentos, setTalentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTalent, setEditingTalent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarTalentos();
  }, []);

  const cargarTalentos = async () => {
    try {
      const data = await getTalents();
      setTalentos(data);
    } catch (error) {
      setError("Error al cargar los talentos");
      console.error(error);
    }
  };

  const handleAddTalent = async (talentData) => {
    try {
      await addTalent(talentData);
      cargarTalentos();
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError("Error al agregar el talento");
      console.error(error);
    }
  };

  const handleEditTalent = async (id, talentData) => {
    try {
      await updateTalent(id, talentData);
      cargarTalentos();
      setEditingTalent(null);
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError("Error al actualizar el talento");
      console.error(error);
    }
  };

  const handleDeleteTalent = async (id) => {
    try {
      await deleteTalent(id);
      cargarTalentos();
      setError(null);
    } catch (error) {
      setError("Error al eliminar el talento");
      console.error(error);
    }
  };

  return (
    <div className="tableContainer">
      <h2>Talentos Registrados</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="noteButton" onClick={() => setShowForm(true)}>Agregar Talento</button>

      <Modal isOpen={showForm || editingTalent} onClose={() => { setShowForm(false); setEditingTalent(null); }}>
        <TalentForm
          initialData={editingTalent}
          onSave={(data) => {
            if (editingTalent) {
              handleEditTalent(editingTalent._id, data);
            } else {
              handleAddTalent(data);
            }
          }}
          onClose={() => { setShowForm(false); setEditingTalent(null); }}
        />
      </Modal>

      <table className="customTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {talentos.map((talento) => (
            <tr key={talento._id}>
              <td>{talento.Nombre}</td>
              <td>{talento.ApelPaterno}</td>
              <td>{talento.ApelMaterno}</td>
              <td>{talento.Email}</td>
              <td>
                <button className="noteButton" onClick={() => {
                  setEditingTalent(talento);
                  setShowForm(true);
                }}>Editar</button>
                <button className="noteButton" onClick={() => handleDeleteTalent(talento._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Talents;
