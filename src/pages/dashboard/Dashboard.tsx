import React, { useEffect, useState } from "react";
import { frases } from "./frases";
import { CheckCircle, Clock, DollarSign } from "lucide-react";

const Dashboard: React.FC = () => {
  const [fraseDelDia, setFraseDelDia] = useState<{
    frase: string;
    autor: string;
  } | null>(null);
  const [frasesMostradas, setFrasesMostradas] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("frasesMostradas");
    const usadas = stored ? JSON.parse(stored) : [];
    setFrasesMostradas(usadas);
    obtenerFrase(usadas);
  }, []);

  const obtenerFrase = (usadas: number[]) => {
    let usadasActuales = usadas;

    if (usadasActuales.length >= frases.length) {
      usadasActuales = [];
      localStorage.setItem("frasesMostradas", JSON.stringify([]));
    }

    const disponibles = frases
      .map((_, index) => index)
      .filter((index) => !usadasActuales.includes(index));

    if (disponibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * disponibles.length);
      const selectedIndex = disponibles[randomIndex];
      setFraseDelDia(frases[selectedIndex]);

      const nuevas = [...usadasActuales, selectedIndex];
      setFrasesMostradas(nuevas);
      localStorage.setItem("frasesMostradas", JSON.stringify(nuevas));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--pluton-background)] p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--pluton-text)]">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Bienvenido a tu panel de control</p>
      </header>

      {fraseDelDia && (
        <div className="mb-8 bg-[var(--pluton-secondary)] p-6 rounded-xl shadow-2xl text-[var(--pluton-text)] border border-b-gray-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-purple-300">✦</span>
              Frase del día
              <span className="text-purple-300">✦</span>
            </h2>
            <span className="text-xs bg-[var(--pluton-background)] px-2 py-1 rounded-full">
              {frasesMostradas.length}/{frases.length} mostradas
            </span>
          </div>

          <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm border border-b-gray-500">
            <blockquote className="text-lg italic mb-4 leading-relaxed">
              "{fraseDelDia.frase}"
            </blockquote>
            <p className="text-right font-medium text-purple-300">
              — {fraseDelDia.autor}
            </p>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => obtenerFrase(frasesMostradas)}
              className="text-xs bg-[var(--pluton-background)] hover:bg-purple-800/70 transition px-4 py-2 rounded-full"
            >
              Ver otra frase
            </button>
          </div>
        </div>
      )}

      {/* Cajas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tareas */}
        <div className="bg-[var(--pluton-secondary)] p-6 rounded-xl shadow-lg border border-b-gray-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[var(--pluton-text)]">
              Tareas
            </h2>
            <span className="bg-[var(--pluton-background)] text-white px-3 py-1 rounded-full text-sm">
              5
            </span>
          </div>
          <p className="text-gray-300 mb-4">Tareas pendientes</p>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-sm font-medium text-white/80">Progreso</span>
              <span className="text-sm font-medium text-white/80">38%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "38%" }}
              ></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[var(--pluton-text)] mb-2">
              Proyectos activos
            </h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sm font-medium text-white/80">Proyecto A</span>
                  <span className="text-sm font-medium text-white/80">75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sm font-medium text-white/80">Proyecto B</span>
                  <span className="text-sm font-medium text-white/80">40%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horarios */}
        <div className="bg-[var(--pluton-secondary)] p-6 rounded-xl shadow-lg border border-b-gray-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[var(--pluton-text)]">
              Horarios
            </h2>
            <span className="bg-[var(--pluton-background)] text-white px-3 py-1 rounded-full text-sm">
              3
            </span>
          </div>
          <p className="text-gray-300 mb-4">Próximos eventos</p>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/80">Reunión de trabajo 10:00</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/80">Entrenamiento 17:30</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/80">Cena familiar 20:00</span>
            </div>
          </div>
        </div>

        {/* Finanzas */}
        <div className="bg-[var(--pluton-secondary)] p-6 rounded-xl shadow-lg border border-b-gray-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[var(--pluton-text)]">
              Finanzas
            </h2>
            <span className="text-xl font-bold text-[var(--pluton-text)]">
              $850
            </span>
          </div>
          <p className="text-gray-300 mb-4">Gasto del mes</p>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-sm font-medium text-white/80">Presupuesto</span>
              <span className="text-sm font-medium text-white/90">71%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "71%" }}
              ></div>
            </div>
          </div>

          <div className="text-sm text-gray-300">$350 restantes de $1200</div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-[var(--pluton-secondary)] p-6 rounded-xl shadow-lg border border-b-gray-500 md:col-span-2">
          <h2 className="text-xl font-semibold text-[var(--pluton-text)] mb-4">
            Actividad reciente
          </h2>
          <p className="text-gray-300 mb-4">
            Tus últimas acciones en la plataforma
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="w-6 h-6 text-green-500">
                <CheckCircle />
              </div>
              <span className="text-sm font-medium text-white/80">Completaste una tarea</span>
              <span className="text-gray-400 text-sm">Hace 2 horas</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <div className="w-6 h-6 text-blue-500">
                <Clock />
              </div>
              <span className="text-sm font-medium text-white/80">Actualizaste un proyecto</span>
              <span className="text-gray-400 text-sm">Ayer</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <div className="w-6 h-6 text-yellow-500">
                <DollarSign />
              </div>
              <span className="text-sm font-medium text-white/80">Registraste un gasto</span>
              <span className="text-gray-400 text-sm">Hace 2 días</span>
            </div>
          </div>
        </div>

        {/* Vencimientos */}
        <div className="bg-[var(--pluton-secondary)] p-6 rounded-xl shadow-lg border border-b-gray-500">
          <h2 className="text-xl font-semibold text-[var(--pluton-text)] mb-4">
            Próximos vencimientos
          </h2>
          <p className="text-gray-300 mb-4">
            Tareas y proyectos con fechas próximas
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/70">
                Entregar informe
              </span>
              <span className="text-sm font-medium text-red-500">Hoy</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/70">
                Reunión con cliente
              </span>
              <span className="text-sm font-medium text-orange-500">
                Mañana
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/70">
                Finalizar proyecto
              </span>
              <span className="text-sm font-medium text-blue-500">
                En 5 días
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-white/70">
                Pago de servicios
              </span>
              <span className="text-sm font-medium text-green-500">
                En 6 días
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
