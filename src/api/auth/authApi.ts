import { LOGIN_URL, USER_EMAIL_URL } from "../urls";

// Función para iniciar sesión
export async function loginUser(email: string, password: string) {
  try {
    const requestData = { email, password };

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

    const loginData = await response.json();
    const { email: userEmail } = loginData.user;

    const userResponse = await fetch(USER_EMAIL_URL, {
      method: "GET",
      credentials: "include",
    });

    if (!userResponse.ok) {
      return {
        success: false,
        message: "Error al obtener información del usuario",
      };
    }

    const userData = await userResponse.json();
    const { id_usuario, username_usuario, nombre_completo_usuario } =
      userData.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        id_usuario,
        username: username_usuario,
        nombre_completo: nombre_completo_usuario,
        email: userEmail,
      })
    );

    return {
      success: true,
      user: {
        id_usuario,
        username: username_usuario,
        nombre_completo: nombre_completo_usuario,
        email: userEmail,
      },
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
    const response = await fetch("/auth/logout", {
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
