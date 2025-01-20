import React from 'react';
import './Topbar.css';

const Topbar = ({ onToggleTheme, isDarkMode }) => {
  return (
    <div className="topbar">
      <div className="toggle">
        <ion-icon name="menu-outline"></ion-icon>
      </div>
      <div className="search">
        <label>
          <input type="text" placeholder="Buscar aquí" />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
      <button className="themeToggleButton" onClick={onToggleTheme}>
        <ion-icon name={isDarkMode ? 'sunny-outline' : 'moon-outline'}></ion-icon>
      </button>
      <div className="user">
        <img src="assets/imgs/customer01.jpg" alt="Usuario" />
      </div>
    </div>
  );
};

export default Topbar;
