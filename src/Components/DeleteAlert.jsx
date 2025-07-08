import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('https://stockbackend-uier.onrender.com/api/alerts');
      console.log("✅ Fetched alerts:", res.data);
      if (Array.isArray(res.data)) {
        setAlerts(res.data);
      } else {
        console.warn("❌ Response is not an array:", res.data);
        toast.error('⚠️ Unexpected response format');
        setAlerts([]);
      }
    } catch (err) {
      console.error("❌ Error fetching alerts:", err);
      toast.error("⚠️ Couldn't load alerts");
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlert = async (email, symbol, threshold) => {
    try {
      await axios.delete('https://stockbackend-uier.onrender.com/api/alerts/delete', {
        params: { email, symbol, threshold }
      });
      toast.success('🗑️ Alert deleted');
      fetchAlerts(); // Refresh after delete
    } catch (err) {
      console.error("❌ Error deleting alert:", err);
      toast.error('❌ Failed to delete alert');
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🗂️ Manage Alerts</h2>

      {loading ? (
        <p className="text-gray-500">⏳ Loading alerts...</p>
      ) : Array.isArray(alerts) && alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded">
            <div>
              📧 {alert.email} | 📈 {alert.symbol} | 🎯 {alert.threshold} | {alert.isAboveThreshold ? '🔼 Above' : '🔽 Below'}
            </div>
            <button
              onClick={() => deleteAlert(alert.email, alert.symbol, alert.threshold)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No alerts found.</p>
      )}
    </div>
  );
};

export default DeleteAlert;
