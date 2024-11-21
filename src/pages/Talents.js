import React, { useState, useEffect } from 'react';
import TalentForm from '../components/TalentForm';
import { getTalents, deleteTalent } from '../services/api';

const Talents = () => {
  const [talentos, setTalentos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarTalentos();
  }, []);

  const cargarTalentos = async () => {
    const data = await getTalents();
    setTalentos(data);
  };

  const eliminarTalento = async (id) => {
    await deleteTalent(id);
    cargarTalentos();
  };

  return (
    <div>
      <h2>Lista de Talentos</h2>
      <button onClick={() => setMostrarFormulario(true)}>Agregar Talento</button>
      {mostrarFormulario && <TalentForm onClose={() => setMostrarFormulario(false)} />}
      <ul>
        {talentos.map((talento) => (
          <li key={talento.id}>
            {talento.nombre} {talento.apellidoPaterno} {talento.apellidoMaterno}
            <button onClick={() => eliminarTalento(talento.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Talents;
