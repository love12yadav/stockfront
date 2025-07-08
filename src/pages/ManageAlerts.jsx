import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [symbol, setSymbol] = useState("");

  const fetchAlerts = async () => {
    if (!symbol) return;
    try {
      const res = await axios.get(`https://stockbackend-uier.onrender.com/api/alerts/symbol/${symbol}`);
      
      // Ensure response is an array
      if (!Array.isArray(res.data)) {
        console.error("Unexpected response:", res.data);
        toast.error("Invalid response from server");
        return;
      }

      setAlerts(res.data);
    } catch (err) {
      toast.error("⚠️ Failed to load alerts");
      console.error(err);
    }
  };

  const deleteAlert = async (email, symbol, threshold) => {
    try {
      await axios.delete(`https://stockbackend-uier.onrender.com/api/alerts/delete`, {
        params: { email, symbol, threshold },
      });
      toast.success("🗑️ Alert deleted");
      fetchAlerts(); // Reload after deletion
    } catch (err) {
      toast.error("❌ Failed to delete alert");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🗂️ Manage Alerts</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="p-2 border rounded uppercase flex-grow"
        />
        <button
          onClick={fetchAlerts}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Load Alerts
        </button>
      </div>

      {alerts.length === 0 ? (
        <p className="text-gray-600">No alerts found for <strong>{symbol}</strong></p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Symbol</th>
              <th className="p-2 border">Threshold</th>
              <th className="p-2 border">Above?</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="text-center border-t">
                <td className="p-2 border">{a.email}</td>
                <td className="p-2 border">{a.phone}</td>
                <td className="p-2 border">{a.symbol}</td>
                <td className="p-2 border">${a.threshold}</td>
                <td className="p-2 border">{a.isAboveThreshold ? "🔼 Above" : "🔽 Below"}</td>
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteAlert(a.email, a.symbol, a.threshold)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAlerts;
