import { REGISTER_URL, USER_LIST_ID } from "../urls";

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

// Función para obtener datos del usuario por id
export async function getUserById(id: number, token: string) {
  try {
    const response = await fetch(`${USER_LIST_ID}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "No se pudo obtener los datos del usuario",
      };
    }

    return { success: true, user: data.user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "Error al obtener usuario por ID",
      };
    }
    return { success: false, message: "Error desconocido" };
  }
}

// Función para hacer solicitudes autenticadas
export async function makeAuthenticatedRequest(url: string, token: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud autenticada");
    }

    const data = await response.json();
    return data;
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
