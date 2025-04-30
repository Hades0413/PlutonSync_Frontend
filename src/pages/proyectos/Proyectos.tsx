import React from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const Proyectos = () => {
  const [showDropdown, setShowDropdown] = React.useState<number | null>(null);

  const proyectos = [
    {
      titulo: "Rediseño de sitio web",
      descripcion:
        "Actualización completa del sitio web corporativo con nuevo diseño y...",
      progreso: 75,
      estado: "En progreso",
      fecha: "14/6/2025",
    },
    {
      titulo: "Investigación de mercado",
      descripcion: "Análisis de competencia y oportunidades en nuevos mercados",
      progreso: 100,
      estado: "Completado",
      fecha: "14/4/2025",
    },
    {
      titulo: "Campaña de marketing Q2",
      descripcion:
        "Planificación y ejecución de campaña de marketing para el segundo trimestre",
      progreso: 40,
      estado: "En progreso",
      fecha: "30/6/2025",
    },
    {
      titulo: "Desarrollo de app móvil",
      descripcion:
        "Creación de aplicación móvil para clientes con funcionalidades de seguimiento",
      progreso: 20,
      estado: "En progreso",
      fecha: "29/9/2025",
    },
  ];

  const handleAction = (action: string, proyecto: string) => {
    console.log(`${action} proyecto: ${proyecto}`);
    // Implementar lógica para editar o eliminar
    setShowDropdown(null);
  };

  const toggleDropdown = (index: number) => {
    setShowDropdown(showDropdown === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Proyectos</h1>
          <p className="text-gray-600">
            Gestiona tus proyectos personales y profesionales
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Menú de tres puntos */}
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(index);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {showDropdown === index && (
                <div
                  className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleAction("Editar", proyecto.titulo)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleAction("Eliminar", proyecto.titulo)}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2 pr-6">
              {proyecto.titulo}
            </h2>
            <p className="text-gray-600 mb-4">{proyecto.descripcion}</p>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Progreso
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {proyecto.progreso}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    proyecto.progreso === 100 ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${proyecto.progreso}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span
                className={`text-sm font-medium ${
                  proyecto.estado === "Completado"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {proyecto.estado}
              </span>
              <span className="text-sm text-gray-500">{proyecto.fecha}</span>
            </div>

            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
