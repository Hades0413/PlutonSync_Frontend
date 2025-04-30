import React from "react";

const Finanzas = () => {
  const transacciones = [
    {
      tipo: "ingreso",
      nombre: "Dividendos de inversiones",
      categoria: "Dividendos",
      monto: "+$120.00",
      fecha: "7/5/2025",
    },
    {
      tipo: "gasto",
      nombre: "Gasolina",
      categoria: "Transporte",
      monto: "-$60.00",
      fecha: "6/5/2025",
    },
    {
      tipo: "gasto",
      nombre: "Restaurante",
      categoria: "Ocio",
      monto: "-$75.00",
      fecha: "5/5/2025",
    },
    {
      tipo: "ingreso",
      nombre: "Trabajo freelance",
      categoria: "Freelance",
      monto: "+$500.00",
      fecha: "4/5/2025",
    },
    {
      tipo: "gasto",
      nombre: "Supermercado",
      categoria: "Alimentación",
      monto: "-$150.00",
      fecha: "2/5/2025",
    },
  ];

  const categoriasGastos = [
    { nombre: "Vivienda", monto: "$800.00" },
    { nombre: "Alimentación", monto: "$150.00" },
    { nombre: "Ocio", monto: "$75.00" },
    { nombre: "Transporte", monto: "$60.00" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Sección de Resumen Financiero */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Finanzas</h1>
        <p className="text-gray-600 mb-6">
          Gestiona tus ingresos, gastos y presupuesto
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta de Ingresos */}
          <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Ingresos
            </h2>
            <p className="text-2xl font-bold text-green-600 mb-1">$3120.00</p>
            <p className="text-sm text-gray-500">Total de ingresos</p>
          </div>

          {/* Tarjeta de Gastos */}
          <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Gastos</h2>
            <p className="text-2xl font-bold text-red-600 mb-1">$1085.00</p>
            <p className="text-sm text-gray-500">Total de gastos</p>
          </div>

          {/* Tarjeta de Balance */}
          <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Balance
            </h2>
            <p className="text-2xl font-bold text-blue-600 mb-1">$2035.00</p>
            <p className="text-sm text-gray-500">Ingresos - Gastos</p>
          </div>
        </div>
      </div>

      {/* Sección de Transacciones Recientes */}
      <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Transacciones recientes
        </h2>
        <p className="text-gray-600 mb-4">
          Historial de tus últimas transacciones
        </p>

        {/* Filtros */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-2">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Todas
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-600">
            Ingresos
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-600">
            Gastos
          </button>
        </div>

        {/* Tabla de transacciones */}
        <div className="space-y-4">
          {transacciones.map((transaccion, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 hover:bg-[var(--pluton-background)] rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    transaccion.tipo === "ingreso"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {transaccion.tipo === "ingreso" ? (
                    <span className="text-green-600">↑</span>
                  ) : (
                    <span className="text-red-600">↓</span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {transaccion.nombre}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaccion.categoria}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${
                    transaccion.tipo === "ingreso"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaccion.monto}
                </p>
                <p className="text-sm text-gray-500">{transaccion.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Distribución de Gastos */}
      <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Distribución de gastos
        </h2>
        <p className="text-gray-600 mb-4">Gastos por categoría</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categoriasGastos.map((categoria, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <p className="font-medium text-gray-700">{categoria.nombre}</p>
              <p className="text-lg font-bold text-red-600">
                {categoria.monto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finanzas;
