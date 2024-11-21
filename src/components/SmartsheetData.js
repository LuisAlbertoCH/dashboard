import React, { useState, useEffect } from 'react';
import { getSheetData } from '../services/smartsheet';

const SmartsheetData = ({ sheetId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await getSheetData(sheetId);
        setData(sheetData.rows || []);
      } catch (error) {
        setError('Error al cargar datos de Smartsheet');
      }
    };

    fetchData();
  }, [sheetId]);

  return (
    <div>
      <h2>Datos de Smartsheet</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            {/* Define tus encabezados de tabla según la estructura de Smartsheet */}
            <th>Columna 1</th>
            <th>Columna 2</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.cells[0]?.value || ''}</td>
              <td>{row.cells[1]?.value || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmartsheetData;
