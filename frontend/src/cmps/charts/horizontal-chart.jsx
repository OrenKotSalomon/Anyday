import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: '2022',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Default',
      data: [Math.random(9)*10, Math.random(9)*10,Math.random(9)*10,Math.random(9)*10,Math.random(9)*10],
      backgroundColor: 'rgba(196, 196, 196, 0.2)',
      borderColor: 'rgba(196, 196, 196, 1)',
      borderWidth: 1,
    },
    {
      label: 'Low',
      data: [Math.random(9)*10, Math.random(9)*10,Math.random(9)*10,Math.random(9)*10,Math.random(9)*10],      backgroundColor: 'rgba(87, 155, 252, 0.2)',
      borderColor: 'rgba(87, 155, 252, 1)',
      borderWidth: 1,
    },
    {
      label: 'Medium',
      data: [Math.random(9)*10, Math.random(9)*10,Math.random(9)*10,Math.random(9)*10,Math.random(9)*10],      backgroundColor: 'rgba(85, 89, 223, 0.2)',
      borderColor: 'rgba(85, 89, 223, 1)',
      borderWidth: 1,
    },
    {
      label: 'High',
      data: [Math.random(9)*10, Math.random(9)*10,Math.random(9)*10,Math.random(9)*10,Math.random(9)*10],      backgroundColor: 'rgba(64, 22, 148, 0.2)',
      borderColor: 'rgba(64, 22, 148, 1)',
      borderWidth: 1,
    },
    {
      label: 'Critical⚠️',
      data: [Math.random(9)*10, Math.random(9)*10,Math.random(9)*10,Math.random(9)*10,Math.random(9)*10],      backgroundColor: 'rgba(51, 51, 51, 0.2)',
      borderColor: 'rgba(51, 51, 51, 1)',
      borderWidth: 1,
    },
  ],
};

export function HorizontalChart() {
  return <Bar options={options} data={data} />;
}
