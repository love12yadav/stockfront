import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyNews = ({ symbol }) => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    const fetchNews = async () => {
      try {
        const from = '2025-01-01';
        const to = '2025-06-29';
        const res = await axios.get(`http://localhost:8080/api/news/${symbol}?from=${from}&to=${to}`);
        setHeadlines(res.data.map(item => item.headline));
      } catch (err) {
        console.error('Failed to fetch company news:', err);
        setHeadlines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [symbol]);

  return (
    <div className="bg-white p-4 rounded shadow">
      {loading ? (
        <p>Loading news...</p>
      ) : headlines.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {headlines.map((headline, idx) => (
            <li key={idx} className="text-gray-800">{headline}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No news available.</p>
      )}
    </div>
  );
};

export default CompanyNews;
