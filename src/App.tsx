// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Errors404 from "./pages/errors/Errors404";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/protected/ProtectedRoute/ProtectedRoute";

import Layout from "./components/layout/Layout";
import Proyectos from "./pages/proyectos/Proyectos";
import Finanzas from "./pages/finanzas/Finanzas";
import Tareas from "./pages/tareas/Tareas";

// Desactiva los logs en modo desarrollo
/*
if (process.env.NODE_ENV === "development") {
  console.log = () => {}; // Desactiva console.log
  console.warn = () => {}; // Desactiva console.warn
  console.error = () => {}; // Desactiva console.error
}
  */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proyectos"
            element={
              <ProtectedRoute>
                <Proyectos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finanzas"
            element={
              <ProtectedRoute>
                <Finanzas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tareas"
            element={
              <ProtectedRoute>
                <Tareas />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Errors404 />} />
      </Routes>
    </Router>
  );
}

export default App;
