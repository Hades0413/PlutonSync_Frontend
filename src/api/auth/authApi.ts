import { LOGIN_URL, LOGOUT_URL } from "../urls";
import { Auth } from "../../types/auth/auth.d";

// Función para iniciar sesión
export async function loginUser(auth: Auth) {
  try {
    const requestData = {
      email_usuario: auth.email_usuario,
      password_usuario: auth.password_usuario,
    };

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Credenciales inválidas. Verifica tu correo y contraseña.",
        };
      }

      if (response.status === 429) {
        return {
          success: false,
          message:
            "Demasiados intentos. Intenta nuevamente en unos 15 minutos.",
        };
      }

      try {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || "Error al iniciar sesión",
        };
      } catch {
        return {
          success: false,
          message: "Error al iniciar sesión: respuesta no válida del servidor",
        };
      }
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso",
    };
  } catch {
    return {
      success: false,
      message: "Error desconocido. Verifica tu conexión o vuelve a intentarlo.",
    };
  }
}

// Función para cerrar sesión
export async function logoutUser() {
  try {
    const response = await fetch(LOGOUT_URL, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Error al cerrar sesión",
      };
    }

    localStorage.removeItem("user");

    return {
      success: true,
      message: "Sesión cerrada correctamente",
    };
  } catch {
    return {
      success: false,
      message: "Error desconocido al cerrar sesión",
    };
  }
}
