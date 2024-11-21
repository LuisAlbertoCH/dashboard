import React from 'react';
import { Line } from 'react-chartjs-2';

const EarningsChart = ({ earningsData, labels }) => {
  const data = {
    labels: labels, // Eje X: Meses o Años
    datasets: [
      {
        label: 'Ganancias ($)',
        data: earningsData, // Eje Y: Ganancias
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw}`, // Formatear valores como dinero
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mes/Año',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ganancias ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default EarningsChart;
