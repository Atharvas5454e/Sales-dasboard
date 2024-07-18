// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';  // Import the CSS file

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [salesTrends, setSalesTrends] = useState([]);

  useEffect(() => {
    fetch('/api/total_sales')
      .then(response => response.json())
      .then(data => setTotalSales(Number(data.total_sales)));  // Ensure totalSales is a number

    fetch('/api/sales_by_category')
      .then(response => response.json())
      .then(data => setSalesByCategory(data));

    fetch('/api/sales_trends')
      .then(response => response.json())
      .then(data => setSalesTrends(data));
  }, []);

  const salesByCategoryData = {
    labels: salesByCategory.map(item => item[0]),
    datasets: [
      {
        data: salesByCategory.map(item => item[1]),
        backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'],
        hoverOffset: 4,
      },
    ],
  };

  const salesTrendsData = {
    labels: salesTrends.map(item => item[0]),
    datasets: [
      {
        data: salesTrends.map(item => item[1]),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        fill: false,
        label: 'Sales Trends',
        tension: 0.4,  // Add smooth lines
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="dashboard">
      <h1>Sales Dashboard</h1>
      <div className="card-container">
        <div className="card">
          <h2>Total Sales</h2>
          <p>{totalSales.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2>Sales by Category</h2>
          <Pie data={salesByCategoryData} options={chartOptions} />
        </div>
        <div className="card">
          <h2>Sales Trends</h2>
          <Line data={salesTrendsData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
