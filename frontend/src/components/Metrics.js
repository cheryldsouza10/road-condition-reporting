import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function Metrics({ metrics }) {
  const byType = metrics?.byType || {};
  const pieData = Object.entries(byType).map(([type, count]) => ({ name: type, value: count }));

  return (
    <div className="metrics-container">
      <div className="metrics-summary">
        <h2>Total Defects: {metrics.total ?? 0}</h2>
        <ul>
          {Object.entries(byType).map(([type, count]) => (
            <li key={type}>{type}: {count}</li>
          ))}
        </ul>
      </div>
      <div className="metrics-chart">
        <ResponsiveContainer width={300} height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Metrics;
