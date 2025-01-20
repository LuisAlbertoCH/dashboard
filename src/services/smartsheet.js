const API_URL = 'http://localhost:5000/smartsheet';
const TOKEN = `Bearer ${process.env.REACT_APP_SMARTSHEET_TOKEN}`;

// Función para obtener datos de una hoja específica
export const getSheetData = async (sheetId) => {
  try {
    const response = await fetch(`${API_URL}/${sheetId}`, {
      method: 'GET',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Error al obtener datos de Smartsheet');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para agregar una nueva fila a la hoja
export const addRowToSheet = async (sheetId, rowData) => {
  try {
    const response = await fetch(`${API_URL}/sheets/${sheetId}/rows`, {
      method: 'POST',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rowData)
    });
    if (!response.ok) throw new Error('Error al agregar fila a Smartsheet');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para actualizar una fila existente en la hoja
export const updateRowInSheet = async (sheetId, rowId, updatedRowData) => {
  try {
    const response = await fetch(`${API_URL}/sheets/${sheetId}/rows/${rowId}`, {
      method: 'PUT',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRowData)
    });
    if (!response.ok) throw new Error('Error al actualizar fila en Smartsheet');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para eliminar una fila de la hoja
export const deleteRowFromSheet = async (sheetId, rowId) => {
  try {
    const response = await fetch(`${API_URL}/sheets/${sheetId}/rows/${rowId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Error al eliminar fila en Smartsheet');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener hojas dentro de un espacio de trabajo
export const getWorkspaceSheets = async (workspaceId) => {
  try {
    const response = await fetch(`${API_URL}/workspace/${workspaceId}`, {
      method: 'GET',
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Error al obtener hojas del espacio de trabajo');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};