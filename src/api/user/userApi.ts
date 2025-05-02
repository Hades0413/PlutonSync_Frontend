import { REGISTER_URL, USER_LIST_ID } from "../urls";
import { Request, Response } from "express"; // Asegúrate de importar estos tipos si estás utilizando Express

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
export async function getUserById(req: Request, res: Response) {
  const { id } = req.params; // Obtenemos el id desde la URL

  try {
    const response = await fetch(`${USER_LIST_ID}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del usuario");
    }

    const data = await response.json();

    res.json({
      success: true,
      user: data.user,
    });
  } catch (error) {
    if (error instanceof Error) {
      // Ahora utilizamos 'error' para enviar el mensaje específico
      res.status(500).json({
        success: false,
        message: error.message || "Error desconocido",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error desconocido",
      });
    }
  }
}

// Función para hacer solicitudes autenticadas
export async function makeAuthenticatedRequest(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
