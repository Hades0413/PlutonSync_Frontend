import React from "react";
import { useNavigate } from "react-router-dom";
import "./Errors404.css";

const Errors404: React.FC = () => {
  const navigate = useNavigate(); 
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="error404-card">
      <div className="error404-grid">
        <div className="error404-error">
          <span className="error404-error-title">404 Error</span>
          <p className="error404-error-description">
            La página que estás buscando no está disponible en este momento. Puede que la URL esté incorrecta o que el contenido haya sido movido.<br />
            Por favor, verifica la dirección URL o regresa al inicio para explorar otras secciones de nuestro sitio web.
          </p>
          <button className="error404-button" onClick={goHome}>INICIO</button>
        </div>
        <div className="error404-img">
          <img
            src="https://i.postimg.cc/DZJvnd48/error.png"
            alt="Error Image"
            className="error404-img-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Errors404;