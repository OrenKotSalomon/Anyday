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
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
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
      data: labels.map(() => Math.random(9)*100),
      backgroundColor: 'rgba(196, 196, 196, 0.5)',
    },
    {
      label: 'Done',
      data: labels.map(() => Math.random(9)*100),
      backgroundColor: 'rgba(0, 200, 117, 0.5)',
    },
    {
      label: 'Stuck',
      data: labels.map(() => Math.random(9)*100),
      backgroundColor: 'rgba(226, 68, 92, 0.5)',
    },
    {
      label: 'Working on it',
      data: labels.map(() => Math.random(9)*100),
      backgroundColor: 'rgba(253, 171, 61, 0.5)',
    },
  ],

};

export function LineChart() {
  return <Bar options={options} data={data} />;
}