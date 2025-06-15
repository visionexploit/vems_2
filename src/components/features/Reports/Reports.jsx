import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('applications');

  // Sample data for charts
  const applicationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const universityData = {
    labels: ['University A', 'University B', 'University C', 'University D'],
    datasets: [
      {
        label: 'Student Distribution',
        data: [30, 25, 20, 25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const paymentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const renderReport = () => {
    switch (selectedReport) {
      case 'applications':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Application Trends</h3>
            <Line data={applicationData} />
          </div>
        );
      case 'universities':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">University Distribution</h3>
            <Pie data={universityData} />
          </div>
        );
      case 'payments':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <Bar data={paymentData} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedReport('applications')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'applications'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setSelectedReport('universities')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'universities'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Universities
          </button>
          <button
            onClick={() => setSelectedReport('payments')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'payments'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Payments
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 gap-6">
        {renderReport()}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Total Applications</h3>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-green-600 text-sm">↑ 12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Active Universities</h3>
          <p className="text-2xl font-bold">45</p>
          <p className="text-green-600 text-sm">↑ 5% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">$123,456</p>
          <p className="text-green-600 text-sm">↑ 8% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
