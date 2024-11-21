import React, { useState, useEffect } from 'react';
import { getProjects, addProject } from '../services/api';

const WorkPlan = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    const data = await getProjects();
    setProyectos(data);
  };

  const abrirFormularioProyecto = () => {
    // Lógica para abrir el formulario de agregar proyecto
    alert("Abrir formulario para agregar proyecto"); // Puedes reemplazarlo con tu lógica
  };

  return (
    <div>
      <h2>Plan de Trabajo</h2>
      <button onClick={abrirFormularioProyecto}>Agregar Proyecto</button>
      <ul>
        {proyectos.map((proyecto) => (
          <li key={proyecto.id}>
            {proyecto.nombre} - {proyecto.estatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkPlan;
