import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="navigation">
      <ul>
      <li>
        <a href="#">
         <span class="icon">
            <ion-icon name="logo-shark"></ion-icon>
         </span>
         <span class="title">CIBERCOM</span>
        </a>
      </li>
        <li>
          <Link to="/">
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/talentos">
            <span className="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span className="title">Talentos</span>
          </Link>
        </li>
        <li>
          <Link to="/plan-de-trabajo">
            <span className="icon">
              <ion-icon name="briefcase-outline"></ion-icon>
            </span>
            <span className="title">Proyectos</span>
          </Link>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="chatbubble-outline"></ion-icon>
            </span>
            <span className="title">Mensajes</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <span className="title">Contraseña</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span className="title">Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
