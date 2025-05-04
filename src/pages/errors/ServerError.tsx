import React from "react";
import { useNavigate } from "react-router-dom";
import { ServerCrash } from "lucide-react"; // Ícono representativo

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-red-700">
            <ServerCrash className="w-16 h-16" />
          </div>
          <h1 className="text-6xl font-extrabold text-red-700 tracking-tight">
            500
          </h1>
          <p className="text-2xl font-semibold text-gray-800">
            Error del servidor
          </p>
          <p className="text-gray-600">
            Algo salió mal en nuestro servidor. Por favor, intenta nuevamente
            más tarde.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
