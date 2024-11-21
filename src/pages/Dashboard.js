import React from 'react';
import Card from '../components/Card';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="cards">
        <Card title="Visitas" value="0" />
        <Card title="Ingresos" value="0" />
        <Card title="Gastos" value="0" />
        <Card title="Ganancia" value="$0" />
      </div>
      <h2>Plan de Trabajo</h2>
      <div className="workplan-preview">
        {/* Aquí puedes cargar una vista del plan de trabajo, solo para visualización */}
      </div>
    </div>
  );
};

export default Dashboard;
