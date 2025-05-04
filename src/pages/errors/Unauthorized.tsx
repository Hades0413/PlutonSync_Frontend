import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react"; // Ícono para acceso restringido

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-yellow-500">
            <Lock className="w-16 h-16" />
          </div>
          <h1 className="text-6xl font-extrabold text-yellow-500 tracking-tight">
            401
          </h1>
          <p className="text-2xl font-semibold text-gray-800">No autorizado</p>
          <p className="text-gray-600">
            Debes iniciar sesión para poder acceder a esta página o recurso
            protegido.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
