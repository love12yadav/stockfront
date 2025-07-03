import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AddAlert from "./Components/AddAlert";
import DeleteAlert from "./Components/DeleteAlert";
import KafkaTrigger from "./pages/KafkaTrigger";
import ManageAlerts from "./pages/ManageAlerts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ This is your single nav bar */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-alert" element={<AddAlert />} />
        <Route path="/manage-alerts" element={<ManageAlerts />} />
        <Route path="/test-kafka" element={<KafkaTrigger />} />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
