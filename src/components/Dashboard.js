import React, { useState, useEffect } from 'react';
import { 
  obtenerProyectos as getProjects, 
  obtenerTalentos as getTalents, 
  agregarVisita as addVisit, 
  obtenerVisitas as getVisits
} from '../services/api';
//import { generarReporteXML } from '../services/api';
import SmartsheetData from '../components/SmartsheetData';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';
import Topbar from './Topbar';

Chart.register(...registerables);

const Dashboard = ({ onToggleTheme }) => {
  const [proyectos, setProyectos] = useState([]);
  const [talentos, setTalentos] = useState([]);
  const [visitas, setVisitas] = useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [ganancias, setGanancias] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);
  const sheetId = 'XhHJQ9MpjfwFvg4g3whjx78GvQpCvccV6p23Ph81';
  const workspaceId = '5911013938751364'
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

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

    const impuestos = egresosTotal * 0.16;
    egresosTotal += impuestos;
    const gananciasNetas = ingresosTotal - egresosTotal;

    setIngresos(ingresosTotal);
    setEgresos(egresosTotal);
    setGanancias(gananciasNetas);
  };

  const generarDatosGrafica = () => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 
      'Noviembre', 'Diciembre'
    ];
    
    const ingresosPorMes = new Array(12).fill(0);
    const gastosPorMes = new Array(12).fill(0);
  
    proyectos.forEach((proyecto) => {
      if (proyecto.Ingreso) {
        const fecha = new Date(proyecto.FechaInicio);
        const mes = fecha.getMonth();
        ingresosPorMes[mes] += parseFloat(proyecto.Ingreso) || 0;
      }
    });
  
    talentos.forEach((talento) => {
      const salarioMensual = parseFloat(talento.Salario) || 0;
      for (let i = 0; i < 12; i++) {
        gastosPorMes[i] += salarioMensual;
      }
    });
  
    proyectos.forEach((proyecto) => {
      if (proyecto.Pago) {
        const fecha = new Date(proyecto.FechaFin);
        const mes = fecha.getMonth();
        gastosPorMes[mes] += parseFloat(proyecto.Presupuesto) || 0;
      }
    });
  
    setChartData({
      labels: meses, // eje X
      datasets: [
        {
          label: 'Proyección de Ingresos ($)',
          data: ingresosPorMes,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Proyección de Gastos ($)',
          data: gastosPorMes,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
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

  const formatNumber = (number) => {
    if (number >= 1_000_000_000) {
      return `$${(number / 1_000_000_000).toFixed(2)}B`; // Billones
    } else if (number >= 1_000_000) {
      return `$${(number / 1_000_000).toFixed(2)}M`; // Millones
    } else if (number >= 1_000) {
      return `$${(number / 1_000).toFixed(2)}K`; // Miles
    } else {
      return `$${number.toFixed(2)}`; // Menos de mil
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
              <div className="numbers">{formatNumber(ingresos)}</div>
              <div className="cardName">Ingresos</div>
            </div>
            <div className="iconBx">
              <ion-icon name="log-in-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{formatNumber(egresos)}</div>
              <div className="cardName">Egresos</div>
            </div>
            <div className="iconBx">
              <ion-icon name="log-out-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{formatNumber(ganancias)}</div>
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
        <SmartsheetData workspaceId={workspaceId} />
      </tr>
    </thead>
    <tbody>
      {proyectos.map((proyecto) => (
        <tr key={proyecto._id}>
          <td>{proyecto.NombreProyecto}</td>
          <td>
            <div className="talentosImagesContainer">
              {proyecto.Talentos.map((talentoId) => {
                const talento = talentos.find((t) => t._id === talentoId);
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
        <div className="chartContainer">
          <h2>Reporte de Ganancias</h2>
          <Line data={chartData} />
        </div>
      </div>
    );    
};

export default Dashboard;
