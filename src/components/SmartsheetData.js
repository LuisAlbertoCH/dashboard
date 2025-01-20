import React, { useState, useEffect } from 'react';
import { getWorkspaceSheets, getSheetData } from '../services/smartsheet';
import Modal from './Modal';

const SmartsheetData = ({ workspaceId }) => {
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [sheetData, setSheetData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const workspaceSheets = await getWorkspaceSheets(workspaceId);
        setSheets(workspaceSheets.sheets || []);
      } catch (error) {
        setError('Error al cargar hojas del espacio de trabajo');
      }
    };

    fetchSheets();
  }, [workspaceId]);

  const handleSheetSelect = async (sheetId) => {
    setSelectedSheet(sheetId);
  };

  const handleLoadSheetData = async () => {
    try {
      const data = await getSheetData(selectedSheet);
      setSheetData(data.rows || []);
      setIsModalOpen(true);
    } catch (error) {
      setError('Error al cargar los datos de la hoja seleccionada');
    }
  };

  const handleOpenSmartsheet = () => {
    if (selectedSheet) {
      const smartsheetUrl = `https://app.smartsheet.com/sheets/${selectedSheet}`;
      window.open(smartsheetUrl, '_blank'); // Abre la URL en una nueva pestaña
    }
  };

  return (
    <div>
      <h2>Hojas disponibles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select
        value={selectedSheet}
        onChange={(e) => setSelectedSheet(e.target.value)}
      >
        <option value="">Selecciona una hoja</option>
        {sheets.map((sheet) => (
          <option key={sheet.id} value={sheet.id}>
            {sheet.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleLoadSheetData}
        disabled={!selectedSheet}
        style={{
          marginLeft: '10px',
          padding: '5px 10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cargar datos
      </button>

      {/* Modal para mostrar datos de la hoja */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Datos de la Hoja</h2>
        <div
          style={{
            maxWidth: '90vw',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '5px',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Duration</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Predecessors</th>
                <th>% Complete</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {sheetData.map((row) => (
                <tr key={row.id}>
                  <td>{row.cells[0]?.value || ''}</td>
                  <td>{row.cells[1]?.value || ''}</td>
                  <td>{row.cells[2]?.value || ''}</td>
                  <td>{row.cells[3]?.value || ''}</td>
                  <td>{row.cells[4]?.value || ''}</td>
                  <td>{row.cells[5]?.value || ''}</td>
                  <td>{row.cells[6]?.value || ''}</td>
                  <td>{row.cells[7]?.value || ''}</td>
                  <td>{row.cells[8]?.value || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleOpenSmartsheet}
          style={{
            marginTop: '10px',
            padding: '5px 15px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Abrir Smartsheet
        </button>
      </Modal>
    </div>
  );
};

export default SmartsheetData;
