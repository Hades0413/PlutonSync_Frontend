import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserCircle } from "lucide-react";
import { registerUser } from "../../../../api/auth/authApi";
import {
  RegisterFormData,
  RegisterResponse,
} from "../../../../types/user/user";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    nombreCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const data: RegisterResponse = await registerUser(
        formData.username,
        formData.nombreCompleto,
        formData.email,
        formData.password
      );

      if (data.success) {
        Swal.fire({
          title: "¡Registro exitoso!",
          text: data.message || "Registro realizado con éxito.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });

        setFormData({
          username: "",
          nombreCompleto: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.message || "No se pudo completar el registro.");
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--pluton-background)] relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-radial from-[var(--pluton-primary)]/30 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />

      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 text-[var(--pluton-text)]"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Crear cuenta</h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {[
          {
            id: "username",
            label: "Nombre de usuario",
            value: formData.username,
            setter: (value: string) =>
              setFormData({ ...formData, username: value }),
            icon: <User size={18} />,
          },
          {
            id: "nombreCompleto",
            label: "Nombre completo",
            value: formData.nombreCompleto,
            setter: (value: string) =>
              setFormData({ ...formData, nombreCompleto: value }),
            icon: <UserCircle size={18} />,
          },
          {
            id: "email",
            label: "Correo electrónico",
            value: formData.email,
            setter: (value: string) =>
              setFormData({ ...formData, email: value }),
            icon: <Mail size={18} />,
            type: "email",
          },
          {
            id: "password",
            label: "Contraseña",
            value: formData.password,
            setter: (value: string) =>
              setFormData({ ...formData, password: value }),
            icon: <Lock size={18} />,
            type: "password",
          },
          {
            id: "confirmPassword",
            label: "Confirmar contraseña",
            value: formData.confirmPassword,
            setter: (value: string) =>
              setFormData({ ...formData, confirmPassword: value }),
            icon: <Lock size={18} />,
            type: "password",
          },
        ].map(({ id, label, value, setter, icon, type = "text" }) => (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block text-sm font-semibold mb-1">
              {label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
              </span>
              <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-[var(--pluton-border)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--pluton-primary)]"
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-4 bg-[var(--pluton-primary)] hover:bg-opacity-90 text-white font-bold rounded-md transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(28,5,83,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </button>

        <p className="mt-6 text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-[var(--pluton-primary)] font-semibold hover:underline"
          >
            Iniciar sesión
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
