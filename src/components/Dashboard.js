import React, { useState, useEffect } from 'react';
import { 
  obtenerProyectos as getProjects, 
  obtenerTalentos as getTalents, 
  agregarVisita as addVisit, 
  obtenerVisitas as getVisits, 
  obtenerNotasTalento as getTalentNotes,
  saveTalentNotes 
} from '../services/api';

import SmartsheetData from '../components/SmartsheetData';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Importar Chart.js y registrar componentes
import './Dashboard.css';

Chart.register(...registerables); // Registro necesario para Chart.js

const Dashboard = () => {
  const [proyectos, setProyectos] = useState([]);
  const [talentos, setTalentos] = useState([]);
  const [visitas, setVisitas] = useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [ganancias, setGanancias] = useState(0);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [talentNotes, setTalentNotes] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null); // Estado para manejar errores
  const sheetId = 'YOUR_SHEET_ID';

  useEffect(() => {
    const cargarDatos = async () => {
      await incrementarVisitas();
      await cargarProyectos();
      cargarTalentos();
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    calcularFinanzas();
    generarDatosGrafica();
  }, [proyectos, talentos]);

  const cargarProyectos = async () => {
    const data = await getProjects();
    setProyectos(data);
  };

  const cargarTalentos = async () => {
    const data = await getTalents();
    setTalentos(data);
  };

  const incrementarVisitas = async () => {
    await addVisit();
    const totalVisitas = await getVisits();
    setVisitas(totalVisitas);
  };

  const calcularFinanzas = () => {
    let ingresosTotal = 0;
    let egresosTotal = 0;

    proyectos.forEach(proyecto => {
      ingresosTotal += parseFloat(proyecto.Ingreso) || 0;
      if (proyecto.Pago) {
        egresosTotal += parseFloat(proyecto.Presupuesto) || 0;
      }
    });

    talentos.forEach(talento => {
      egresosTotal += parseFloat(talento.Salario) || 0;
    });

    const impuestos = egresosTotal * 0.16; // Calcula impuestos sobre los egresos
    egresosTotal += impuestos; // Sumar impuestos a los egresos totales
    const gananciasNetas = ingresosTotal - egresosTotal;

    setIngresos(ingresosTotal);
    setEgresos(egresosTotal);
    setGanancias(gananciasNetas);
  };

  const generarDatosGrafica = () => {
    const agrupados = agruparGanancias(proyectos);
    const labels = Object.keys(agrupados);
    const datos = Object.values(agrupados);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Ganancias ($)',
          data: datos,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
  };

  const agruparGanancias = (proyectos) => {
    const gananciasPorMes = {};
    proyectos.forEach((proyecto) => {
      if (proyecto.Ingreso) {
        const fecha = new Date(proyecto.FechaFin);
        const mesAnio = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        gananciasPorMes[mesAnio] = (gananciasPorMes[mesAnio] || 0) + proyecto.Ingreso;
      }
    });
    return gananciasPorMes;
  };

  const handleSelectTalent = async (talento) => {
    setSelectedTalent(talento);
    try {
      const notes = await getTalentNotes(talento._id); // Obtener las notas de un talento específico
      setTalentNotes(notes || '');
    } catch (error) {
      setError("Error al obtener notas del talento");
      setTalentNotes('');
    }
  };

  const handleNotesChange = (e) => {
    setTalentNotes(e.target.value);
  };

  const handleSaveNotes = async () => {
    if (selectedTalent) {
      try {
        await saveTalentNotes(selectedTalent._id, talentNotes);
        alert('Nota guardada correctamente');
      } catch (error) {
        setError('Error al guardar la nota');
      }
    } else {
      setError('Selecciona un talento antes de guardar una nota');
    }
  };  

  return (
    <div className="dashboard">
      {/* Cards */}
      <div className="cardBox">
        <div className="card">
          <div>
            <div className="numbers">{visitas}</div>
            <div className="cardName">Visitas</div>
          </div>
          <div className="iconBx">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">${ingresos.toFixed(2)}</div>
            <div className="cardName">Ingresos</div>
          </div>
          <div className="iconBx">
            <ion-icon name="log-in-outline"></ion-icon>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">${egresos.toFixed(2)}</div>
            <div className="cardName">Egresos</div>
          </div>
          <div className="iconBx">
            <ion-icon name="log-out-outline"></ion-icon>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">${ganancias.toFixed(2)}</div>
            <div className="cardName">Ganancias</div>
          </div>
          <div className="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </div>
      </div>

      {/* Tabla de Proyectos */}
      <div className="dashboard">
        <h2>Proyectos</h2>
        <table className="projectsTable">
          <thead>
            <tr>
              <th>Nombre del Proyecto</th>
              <th>Talentos</th>
              <th>Presupuesto</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Progreso</th>
              <SmartsheetData sheetId={sheetId} />
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto) => (
              <tr key={proyecto._id}>
                <td>{proyecto.NombreProyecto}</td>
                <td>{proyecto.Talentos.map((t) => t.nombre).join(', ')}</td>
                <td>{proyecto.Presupuesto ? `$${proyecto.Presupuesto}` : ''}</td>
                <td>{proyecto.Estatus}</td>
                <td>{proyecto.Pago ? 'Pagado' : 'Pendiente'}</td>
                <td>
                  <div className="progressContainer">
                    <div
                      className="progressBar"
                      style={{ width: `${proyecto.Completion || 0}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfica */}
      <div>
        <h2>Reporte de Ganancias</h2>
        <Line data={chartData} />
      </div>

      {/* Notas por Talento */}
      <div className="talentosNotas">
        <div className="talentosList">
          <h3>Talentos Registrados</h3>
          <ul>
            {talentos.map(talento => (
              <li key={talento._id}>
                {talento.Nombre} {talento.ApelPaterno}
                <button onClick={() => handleSelectTalent(talento)}>
                  <ion-icon name="reader-outline"></ion-icon> Nota
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tableContainer">
          <h2>Notas para {selectedTalent ? selectedTalent.Nombre : 'Selecciona un talento'}</h2>
          <textarea
            placeholder="Escribe tus notas aquí..."
            value={talentNotes}
            onChange={handleNotesChange}
            style={{ width: '100%', minHeight: '100px', margin: '10px 0', padding: '10px' }}
          ></textarea>
          <button className="noteButton" onClick={handleSaveNotes}>
            Guardar Nota
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
