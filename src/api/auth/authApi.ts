import { LOGIN_URL, REGISTER_URL, USER_EMAIL_URL } from "../urls";

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
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      } catch {
        throw new Error(
          "Error al iniciar sesión: respuesta no válida del servidor"
        );
      }
    }

    const loginData = await response.json();
    const { email: userEmail } = loginData.user;

    // Hacemos la petición protegida para obtener más datos
    const userResponse = await fetch(USER_EMAIL_URL, {
      method: "GET",
      credentials: "include",
    });

    if (!userResponse.ok) {
      throw new Error("Error al obtener información del usuario");
    }

    const userData = await userResponse.json();
    const { id_usuario, username_usuario, nombre_completo_usuario } =
      userData.user;

    // Guardar todo en localStorage
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message || "Error de conexión" };
    }

    return { success: false, message: "Error desconocido" };
  }
}

// Función para registrar un usuario
export async function registerUser(
  username: string,
  nombre_completo: string,
  email: string,
  password: string
) {
  try {
    const requestData = { username, nombre_completo, email, password };

    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar el usuario");
      } catch {
        throw new Error(
          "Error al registrar el usuario: respuesta no válida del servidor"
        );
      }
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message || "Error de conexión" };
    }

    return { success: false, message: "Error desconocido" };
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
      throw new Error("Error al cerrar sesión");
    }

    localStorage.removeItem("user");

    return { success: true, message: "Sesión cerrada correctamente" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "Error de conexión",
      };
    }

    return { success: false, message: "Error desconocido" };
  }
}
