// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import SecurityGuard from "./components/protected/Security";
import Layout from "./components/layout/Layout";
import Proyectos from "./pages/proyectos/Proyectos";
import Finanzas from "./pages/finanzas/Finanzas";
import Tareas from "./pages/tareas/Tareas";
import Profile from "./pages/profile/Profile";
import Unauthorized from "./pages/errors/Unauthorized";
import Forbidden from "./pages/errors/Forbidden";
import ServerError from "./pages/errors/ServerError";
import NotFound from "./pages/errors/NotFound";
//import Errors404 from "./pages/errors/Errors404";

// Desactiva los logs en modo desarrollo
if (import.meta.env.VITE_NODE_ENV === "development") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

function App() {
  return (
    <>
      <SecurityGuard />
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
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route path="*" element={<Errors404 />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
