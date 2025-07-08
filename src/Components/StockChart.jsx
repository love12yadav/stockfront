import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://stockbackend-uier.onrender.com/api/stocks/price/history/${symbol}`);
        const points = res.data;

        if (!points || points.length === 0) {
          console.warn("No chart data available");
          return;
        }

        const labels = points.map(p =>
          new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        );

        const prices = points.map(p => p.price);

        setChartData({
          labels,
          datasets: [
            {
              label: `${symbol} Price`,
              data: prices,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,0,255,0.1)',
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]);

  if (loading) return <p>📉 Loading chart...</p>;
  if (!chartData) return <p>❌ No chart data available</p>;

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2">📊 {symbol} - Live Price Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default StockChart;
