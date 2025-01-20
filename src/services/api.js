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

export const eliminarNota = async (id) => {
  await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE'
  });
};

// Agregar un indicador a un talento
export const agregarIndicador = async (talentId, indicadorData) => {
  const response = await fetch(`${API_URL}/talentos/${talentId}/indicadores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(indicadorData)
  });
  if (!response.ok) {
    throw new Error('Error al agregar indicador');
  }
  return await response.json();
};

// Obtener indicadores de un talento
export const obtenerIndicadores = async (talentId) => {
  const response = await fetch(`${API_URL}/talentos/${talentId}/indicadores`);
  if (!response.ok) {
    throw new Error('Error al obtener indicadores');
  }
  return await response.json();
};

// Obtener la evaluación de un talento
export const obtenerEvaluacion = async (talentId) => {
  const response = await fetch(`${API_URL}/talentos/${talentId}/evaluacion`);
  if (!response.ok) {
    throw new Error('Error al obtener evaluación');
  }
  return await response.json();
};

// Función para actualizar un indicador de un talento
export const actualizarIndicador = async (talentId, indicatorId, value) => {
  const response = await fetch(`${API_URL}/talentos/${talentId}/indicadores/${indicatorId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ valor: value }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el indicador');
  }
  return response.json();
};

// Función para generar el reporte XML
//export const generarReporteXML = async () => {
//  try {
//    const response = await fetch(`${API_URL}/xml`, {
//      method: 'GET',
//      headers: {
//        'Content-Type': 'application/xml',
//      },
//    });

//    if (!response.ok) {
//      throw new Error('Error al generar el reporte XML');
//    }

    // Convertir la respuesta en un blob para descargar el archivo
//    const blob = await response.blob();
//    const url = window.URL.createObjectURL(blob);
//    const link = document.createElement('a');
//    link.href = url;
//    link.setAttribute('download', 'reporte-ganancias.xml');
//    document.body.appendChild(link);
//    link.click();
//    link.remove();
//  } catch (error) {
//    console.error('Error al generar el reporte XML:', error.message);
//  }
//};
