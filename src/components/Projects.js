import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import './Tables.css';
import '../App.css';
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
      console.log("Proyectos cargados:", data);
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
    const projectId = id.$oid || id;
    console.log("ID procesado en handleEditProject:", projectId);
    console.log("Datos recibidos para editar el proyecto:", projectData);
    
    try {
      // Actualizamos el proyecto en la base de datos
      await updateProject(projectId, projectData);
      
      // Recargar los proyectos y talentos para asegurarnos de que todo esté actualizado
      await Promise.all([cargarProyectos(), cargarTalentos()]);
  
      // Verificar que los proyectos y talentos se hayan cargado correctamente
      console.log("Proyectos después de la edición:", proyectos);
      console.log("Talentos después de la edición:", talentos);
  
      setEditingProject(null);
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError("Error al actualizar el proyecto");
      console.error(error);
    }
  };  
  
  const handleDeleteProject = async (id) => {
    // Asegúrate de que el ID sea un string
    const projectId = id.$oid || id;
    console.log("ID procesado en handleDeleteProject:", projectId);
  
    try {
      await deleteProject(projectId);
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
        {proyectos.map((proyecto) => {
  console.log("Talentos en proyecto después de la edición:", proyecto.Talentos);
  return (
    <tr key={proyecto._id}>
      <td>{proyecto.NombreProyecto}</td>
      <td>
        <div className="talentosImagesContainer">
        {proyecto.Talentos.map((talentoId) => {
  const talento = talentos.find((t) => t._id === talentoId);
  console.log("Talento encontrado:", talento);  // Verifica talento y Fotografia
  console.log("URL de la imagen:", talento?.Fotografia || 'ruta/default/avatar.png');  // Ver URL de la imagen

  return talento ? (
    <img
      key={talento._id}
      src={talento.Fotografia || 'ruta/default/avatar.png'}
      alt={talento.Nombre}
      title={`${talento.Nombre} ${talento.ApelPaterno}`}
      className="talentosImage"
    />
  ) : null;
})}
        </div>
      </td>
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
  );
})}
        </tbody>
      </table>
    </div>
  );

};

export default Projects;
