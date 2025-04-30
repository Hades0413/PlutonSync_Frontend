import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../api/auth/authApi";
import { Mail, Lock } from "lucide-react";
import { z } from "zod";
import Swal from "sweetalert2";

// Definir el esquema de validación usando Zod
const loginSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(12, "La contraseña debe tener al menos 12 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un dígito")
    .regex(
      /[^A-Za-z0-9]/,
      "La contraseña debe contener al menos un símbolo especial"
    ),
});

// El tipo `UserResponse` es el único necesario aquí.
import { UserResponse } from "../../../../types/auth/auth";

// Componente del formulario de Login
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Manejo de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar con Zod
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      // Si la validación falla, mostramos los errores
      const errorMessage = validationResult.error.format();
      setError(
        errorMessage.email?._errors[0] ||
          errorMessage.password?._errors[0] ||
          ""
      );
      return;
    }

    try {
      // Hacer la llamada a la API de login
      const response: UserResponse = await loginUser(email, password);

      if (response?.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Bienvenido al panel de control",
        });
      } else {
        setError(response?.message || "Credenciales incorrectas.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Credenciales incorrectas.",
        });
      }
    } catch (err) {
      console.error("Error de login:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Hubo un error en la conexión. Inténtalo nuevamente.";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--pluton-background)] relative overflow-hidden">
      {/* Fondo dinámico */}
      <div className="absolute inset-0 bg-gradient-radial from-[var(--pluton-primary)]/20 via-transparent to-transparent blur-3xl opacity-30 pointer-events-none"></div>

      {/* Tarjeta de login */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-[var(--pluton-text)]"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Iniciar Sesión
        </h2>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Correo electrónico
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-[var(--pluton-border)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--pluton-primary)]"
              placeholder="Ingresa tu correo"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-[var(--pluton-border)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--pluton-primary)]"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 mt-2 bg-[var(--pluton-primary)] hover:bg-opacity-90 text-white font-bold rounded-md transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(28,5,83,0.6)]"
        >
          Iniciar sesión
        </button>

        <p className="mt-6 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[var(--pluton-primary)] hover:underline font-semibold"
          >
            Crear cuenta
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
