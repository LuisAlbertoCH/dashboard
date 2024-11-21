const API_URL = 'http://localhost:5000';

// Función para añadir un talento
export const agregarTalento = async (talentoData) => {
  try {
    const response = await fetch(`${API_URL}/talentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(talentoData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error desconocido al guardar el talento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al guardar talento:', error.message);
    throw error;
  }
};

// Función para obtener todos los talentos
export const obtenerTalentos = async () => {
  const response = await fetch(`${API_URL}/talentos`);
  return response.json();
};

// Función para actualizar un talento
export const actualizarTalento = async (id, talentoData) => {
  await fetch(`${API_URL}/talentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(talentoData)
  });
};

// Función para eliminar un talento
export const eliminarTalento = async (id) => {
  await fetch(`${API_URL}/talentos/${id}`, {
    method: 'DELETE'
  });
};

// Funciones CRUD para Proyectos

// Función para añadir un proyecto
export const agregarProyecto = async (projectData) => {
  const response = await fetch(`${API_URL}/proyectos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });
  if (!response.ok) {
    throw new Error('Error al agregar proyecto');
  }
  return response.json();
};

// Función para obtener todos los proyectos
export const obtenerProyectos = async () => {
  const response = await fetch(`${API_URL}/proyectos`);
  if (!response.ok) {
    throw new Error('Error al cargar proyectos');
  }
  return response.json();
};

// Función para actualizar un proyecto
export const actualizarProyecto = async (id, projectData) => {
  const response = await fetch(`${API_URL}/proyectos/${String(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });
  if (!response.ok) {
    throw new Error('Error al actualizar proyecto');
  }
  return response.json();
};

// Función para eliminar un proyecto
export const eliminarProyecto = async (id) => {
  const response = await fetch(`${API_URL}/proyectos/${String(id)}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Error al eliminar proyecto');
  }
  return response.json();
};

// Función para añadir una visita (incrementar el contador de visitas)
export const agregarVisita = async () => {
  await fetch(`${API_URL}/visits`, {
    method: 'POST'
  });
};

// Función para obtener el total de visitas
export const obtenerVisitas = async () => {
  const response = await fetch(`${API_URL}/visits`);
  const data = await response.json();
  return data.count;
};

// Función para obtener las notas de un talento
export const obtenerNotasTalento = async (id) => {
  const response = await fetch(`${API_URL}/talentos/${id}/notes`);
  if (!response.ok) {
    throw new Error('Error al obtener notas del talento');
  }
  return response.json();
};

// Función para guardar notas de un talento

export const saveTalentNotes = async (talentId, content) => {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ talent_id: talentId, content }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar la nota');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al guardar la nota:', error);
    throw error;
  }
};



