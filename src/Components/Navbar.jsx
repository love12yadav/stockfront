import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linkClasses = (path) =>
    `transition duration-300 hover:text-cyan-300 px-3 py-1 rounded 
     ${location.pathname === path ? 'bg-cyan-400 text-black font-semibold' : 'text-white'}`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-indigo-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📡 <span className="text-cyan-300">Stock Notifier</span>
          </h1>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/" className={linkClasses('/')}>Home</Link>
            <Link to="/add-alert" className={linkClasses('/add-alert')}>Add Alert</Link>
            <Link to="/manage-alerts" className={linkClasses('/manage-alerts')}>Manage Alerts</Link>
            <Link to="/test-kafka" className={linkClasses('/test-kafka')}>Kafka Trigger</Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 pb-4 space-y-2">
          <Link to="/" onClick={toggleMenu} className={linkClasses('/')}>Home</Link>
          <Link to="/add-alert" onClick={toggleMenu} className={linkClasses('/add-alert')}>Add Alert</Link>
          <Link to="/manage-alerts" onClick={toggleMenu} className={linkClasses('/manage-alerts')}>Manage Alerts</Link>
          <Link to="/test-kafka" onClick={toggleMenu} className={linkClasses('/test-kafka')}>Kafka Trigger</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
