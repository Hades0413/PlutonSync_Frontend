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
  