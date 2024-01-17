import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./BarChart.css";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChart = ({ title, data, startDate, endDate ,dateActive}) => {
  const [dateStatus, setDateStatus] = useState(dateActive);
  const [start, setStart] = useState(startDate || data.labels[0]);
  const [end, setEnd] = useState(endDate || data.labels[data.labels.length - 1]);

  const extractMonthAndDay = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}`;
  };

  const filteredData = {
    labels: data.labels
      .filter(date => date >= start && date <= end)
      .map(extractMonthAndDay),
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: data.labels.reduce((acc, date, index) => {
        if (date >= start && date <= end) {
          acc.push(dataset.data[index]);
        }
        return acc;
      }, []),
    })),
  };

  const options = {};

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <div className='row mb-4'>
        <div className='col-12 all_start'>
          <span className='tichart me-4'>{title}</span>

          {dateStatus == "Active" && (
            <div className='all_start'>
              <div className='all_center'>
                <label className='labtag'>Start Date:</label>
                <input className='indatetag' type="date" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div className='all_center'>
                <label className='labtag'>End Date:</label>
                <input className='indatetag' type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </div>
          )}
        </div>
      </div>

      <Bar data={filteredData} options={options} />
    </div>
  );
};

export default BarChart;
