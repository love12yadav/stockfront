import React, { useEffect, useState } from "react";
import axios from "axios";

const LivePrices = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = () => {
      axios.get("https://stockbackend-uier.onrender.com/api/prices")
        .then(res => setPrices(res.data))
        .catch(err => console.error("❌ Error fetching prices:", err));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📈 Live Stock Prices</h2>
      <ul className="space-y-2">
        {Object.entries(prices).map(([symbol, price]) => (
          <li key={symbol} className="bg-gray-100 p-2 rounded">
            {symbol}: <strong>${price}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivePrices;
