import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react"; // Usa lucide-react (iconos modernos)

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 text-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-red-500">
            <AlertCircle className="w-16 h-16" />
          </div>
          <h1 className="text-6xl font-extrabold text-red-500 tracking-tight">404</h1>
          <p className="text-2xl font-semibold text-gray-800">Página no encontrada</p>
          <p className="text-gray-600">
            Lo sentimos, la página que estás buscando no existe, fue eliminada o está en mantenimiento.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
