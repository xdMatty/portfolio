import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      'data-theme',
      !darkMode ? 'dark' : 'light'
    );
  };

  return (
    <nav className="navbar">
      <div className="logo">MattyW</div>
      <ul className="nav-links">
        <li><a href="#hero">Start</a></li>
                <li><a href="#projects">Projekty</a></li>
        <li><a href="#stack">Tech Stack</a></li>

        <li><a href="#contact">Kontakt</a></li>
      </ul>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
