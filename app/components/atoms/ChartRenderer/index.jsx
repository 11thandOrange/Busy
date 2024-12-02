import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartRenderer = ({ data, basicOptions, chartRef }) => {
  // Default/common configuration options
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '',
        },
      },
      y: {
        title: {
          display: true,
          text: '',
        },
      },
    },
  };

  // Merge common options with dynamic basic options
  const options = {
    ...defaultOptions,
    ...basicOptions,
    plugins: {
      ...defaultOptions.plugins,
      ...basicOptions?.plugins,
    },
    scales: {
      ...defaultOptions.scales,
      ...basicOptions?.scales,
    },
  };

  return <Line data={data} options={options} ref={chartRef}/>;
};

export default ChartRenderer;
