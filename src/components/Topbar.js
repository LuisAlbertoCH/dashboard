import React from 'react';

const Topbar = () => {
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
      <div className="user">
        <img src="assets/imgs/customer01.jpg" alt="Usuario" />
      </div>
    </div>
  );
};

export default Topbar;
