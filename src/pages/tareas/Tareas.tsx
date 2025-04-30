import React from "react";
import { Circle, ChevronDown, CheckCircle } from "lucide-react";

const Tareas = () => {
  const [tareas, setTareas] = React.useState([
    {
      id: 1,
      titulo: "Completar informe mensual",
      descripcion: "Preparar el informe de ventas para la reunión del viernes",
      prioridad: "Alta",
      fecha: "4/5/2025",
      completada: false,
    },
    {
      id: 2,
      titulo: "Enviar correos a clientes",
      descripcion: "Actualizar a los clientes sobre los nuevos servicios",
      prioridad: "Media",
      fecha: "2/5/2025",
      completada: false,
    },
    {
      id: 3,
      titulo: "Preparar presentación",
      descripcion: "Crear dispositivas para la reunión con inversores",
      prioridad: "Alta",
      fecha: "9/5/2025",
      completada: false,
    },
  ]);

  const tareasCompletadas = 2;
  const tareasPendientes = tareas.filter((t) => !t.completada).length;

  const toggleCompletada = (id: number) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 font-sans bg-[var(--pluton-secondary)]  rounded-lg shadow-sm">
      {/* Encabezado */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tareas</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Gestiona tus tareas y actividades pendientes
        </p>
      </div>

      {/* Contador de tareas */}
      <div className="flex items-center space-x-4 mb-4 md:mb-6">
        <span className="font-medium text-gray-800">
          Pendientes ({tareasPendientes})
        </span>
        <span className="text-gray-500">Completadas ({tareasCompletadas})</span>
      </div>

      {/* Línea divisoria */}
      <hr className="border-gray-200 mb-4 md:mb-6" />

      {/* Sección de tareas pendientes */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">
            Tareas pendientes
          </h2>
          <p className="text-gray-500 text-sm">
            Tareas que necesitan ser completadas
          </p>
        </div>

        {/* Lista de tareas */}
        <div className="space-y-4 md:space-y-6">
          {tareas
            .filter((t) => !t.completada)
            .map((tarea) => (
              <div
                key={tarea.id}
                className="flex items-start space-x-3 p-3 hover:bg-[var(--pluton-background)] rounded-lg transition-colors"
              >
                <button
                  onClick={() => toggleCompletada(tarea.id)}
                  className="mt-0.5 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {tarea.completada ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <span className="font-medium text-gray-800">
                      {tarea.titulo}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full mt-1 md:mt-0 ${
                        tarea.prioridad === "Alta"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tarea.prioridad}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {tarea.descripcion}
                  </p>

                  <div className="flex items-center mt-2 text-gray-400 text-xs">
                    <ChevronDown className="h-3 w-3 mr-1" />
                    <span>{tarea.fecha}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tareas;
