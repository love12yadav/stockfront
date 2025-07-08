import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import StockChart from '../Components/StockChart';
import CompanyNews from '../Components/CompanyNews';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';

const Home = () => {
  const [symbol, setSymbol] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [livePrices, setLivePrices] = useState({});

  const fetchPrice = async () => {
    if (!symbol.trim()) {
      toast.warn('Please enter a stock symbol.');
      return;
    }

    try {
      const res = await axios.get(`https://stockbackend-uier.onrender.com/api/stocks/price/${symbol}`);
      setPriceData(res.data);
    } catch {
      toast.error('Failed to fetch price');
    }
  };

  useEffect(() => {
    const socket = new SockJS('https://stockbackend-uier.onrender.com/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe('/topic/alerts', message => {
          toast.info(message.body);
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  const testKafka = async () => {
    try {
      await axios.get('https://stockbackend-uier.onrender.com/api/test/kafka');
      toast.success('📤 Kafka test message sent!');
    } catch {
      toast.error('Kafka trigger failed');
    }
  };

  const fetchLivePrices = async () => {
    try {
      const res = await axios.get('https://stockbackend-uier.onrender.com/api/prices');
      setLivePrices(res.data);
    } catch (err) {
      console.error('Failed to load live prices:', err);
    }
  };

  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📈 Stock Price Dashboard</h2>

      {/* Search input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Symbol (e.g., AAPL)"
          className="p-2 border rounded flex-grow uppercase"
          value={symbol}
          onChange={e => setSymbol(e.target.value.toUpperCase())}
        />
        <button
          onClick={fetchPrice}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Get Price
        </button>
      </div>

      {/* Latest price box */}
      {priceData && (
        <div className="bg-green-100 p-4 rounded mb-4">
          <p>📊 Symbol: <strong>{priceData.symbol}</strong></p>
          <p>💲 Current Price: <strong>${priceData.price}</strong></p>
        </div>
      )}

      {/* Kafka-streamed live prices */}
      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">📡 Live Prices (from Kafka)</h3>
        {Object.keys(livePrices).length === 0 ? (
          <p className="text-gray-500">No live data yet...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(livePrices).map(([sym, price]) => (
              <div key={sym} className="bg-white p-3 rounded border">
                <strong>{sym}</strong>: ${price.toFixed(2)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chart and News side-by-side */}
      {symbol && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Stock Chart on Left */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">📉 Stock Chart</h3>
            <StockChart symbol={symbol} />
          </div>

          {/* News Feed on Right */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">📰 Company News</h3>
            <CompanyNews symbol={symbol} />
          </div>
        </div>
      )}

      {/* Kafka alert tester */}
      <div className="text-center mt-8">
        <button
          onClick={testKafka}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          🔁 Trigger Kafka Alert
        </button>
      </div>
    </div>
  );
};

export default Home;
