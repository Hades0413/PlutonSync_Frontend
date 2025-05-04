import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldOff } from "lucide-react"; // Ícono representativo

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-purple-500">
            <ShieldOff className="w-16 h-16" />
          </div>
          <h1 className="text-6xl font-extrabold text-purple-500 tracking-tight">
            403
          </h1>
          <p className="text-2xl font-semibold text-gray-800">
            Acceso denegado
          </p>
          <p className="text-gray-600">
            No tienes los permisos necesarios para ver esta página o acceder al
            recurso solicitado.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
