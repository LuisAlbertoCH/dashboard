import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import './Tables.css';
import { 
  obtenerProyectos as getProjects, 
  obtenerTalentos as getTalents, 
  agregarProyecto as addProject, 
  actualizarProyecto as updateProject, 
  eliminarProyecto as deleteProject 
} from '../services/api';

const Projects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [talentos, setTalentos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProyectos();
    cargarTalentos();
  }, []);

  const cargarProyectos = async () => {
    try {
      const data = await getProjects();
      setProyectos(data);
    } catch (error) {
      setError("Error al cargar los proyectos");
      console.error(error);
    }
  };

  const cargarTalentos = async () => {
    try {
      const data = await getTalents();
      setTalentos(data);
    } catch (error) {
      setError("Error al cargar los talentos");
      console.error(error);
    }
  };

  const handleAddProject = async (projectData) => {
    try {
      await addProject(projectData);
      cargarProyectos();
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError("Error al agregar el proyecto");
      console.error(error);
    }
  };

  const handleEditProject = async (id, projectData) => {
    try {
      await updateProject(id, projectData);
      cargarProyectos();
      setEditingProject(null);
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError("Error al actualizar el proyecto");
      console.error(error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      cargarProyectos();
      setError(null);
    } catch (error) {
      setError("Error al eliminar el proyecto");
      console.error(error);
    }
  };

  return (
    <div className="tableContainer">
      <h2>Proyectos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="noteButton" onClick={() => setShowForm(true)}>Agregar Proyecto</button>

      <Modal isOpen={showForm || editingProject} onClose={() => { setShowForm(false); setEditingProject(null); }}>
        <ProjectForm
          initialData={editingProject}
          talentos={talentos}
          onSave={(data) => {
            if (editingProject) {
              handleEditProject(editingProject._id, data);
            } else {
              handleAddProject(data);
            }
          }}
          onClose={() => { setShowForm(false); setEditingProject(null); }}
        />
      </Modal>

      <table className="customTable">
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>Talentos</th>
            <th>Presupuesto</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto._id}>
              <td>{proyecto.NombreProyecto}</td>
              <td>{proyecto.Talentos.map((t) => t.nombre).join(', ')}</td>
              <td>{proyecto.Presupuesto ? `$${proyecto.Presupuesto}` : 'N/A'}</td>
              <td>{proyecto.Estatus}</td>
              <td>{proyecto.Pago ? 'Pagado' : 'Pendiente'}</td>
              <td>
                <button className="noteButton" onClick={() => {
                  setEditingProject(proyecto);
                  setShowForm(true);
                }}>Editar</button>
                <button className="noteButton" onClick={() => handleDeleteProject(proyecto._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
