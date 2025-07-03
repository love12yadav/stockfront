import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [symbol, setSymbol] = useState("");

  const fetchAlerts = async () => {
    if (!symbol) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/alerts/symbol/${symbol}`);
      setAlerts(res.data);
    } catch (err) {
      toast.error("Failed to load alerts");
    }
  };

  const deleteAlert = async (email, symbol, threshold) => {
    try {
      await axios.delete(`http://localhost:8080/api/alerts/delete`, {
        params: { email, symbol, threshold },
      });
      toast.success("Alert deleted");
      fetchAlerts();
    } catch (err) {
      toast.error("Failed to delete alert");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🗑️ Manage Alerts</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-2 border rounded uppercase flex-grow"
        />
        <button onClick={fetchAlerts} className="bg-blue-600 text-white px-4 py-2 rounded">
          Load Alerts
        </button>
      </div>

      {alerts.length === 0 ? (
        <p>No alerts found for {symbol}</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Email</th>
              <th>Phone</th>
              <th>Symbol</th>
              <th>Threshold</th>
              <th>Above?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="text-center border-t">
                <td className="p-2">{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.symbol}</td>
                <td>${a.threshold}</td>
                <td>{a.isAboveThreshold ? "Above" : "Below"}</td>
                <td>
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
