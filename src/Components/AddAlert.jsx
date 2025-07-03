
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddAlert = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    symbol: '',
    threshold: '',
    isAboveThreshold: true,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/alerts', formData);
      toast.success('✅ Alert added successfully!');
      setFormData({ email: '', phone: '', symbol: '', threshold: '', isAboveThreshold: true });
    } catch (error) {
      toast.error('❌ Failed to add alert');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📬 Add Stock Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="symbol" type="text" placeholder="Stock Symbol (e.g., AAPL)" value={formData.symbol} onChange={handleChange} required className="w-full p-2 border rounded uppercase" />
        <input name="threshold" type="number" step="0.01" placeholder="Threshold Price" value={formData.threshold} onChange={handleChange} required className="w-full p-2 border rounded" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isAboveThreshold" checked={formData.isAboveThreshold} onChange={handleChange} />
          <span>Trigger if price is above threshold</span>
        </label>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add Alert</button>
      </form>
    </div>
  );
};

export default AddAlert;
