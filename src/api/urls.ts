// Función para validar las variables de entorno
const validateUrl = (url: string | undefined, urlName: string): string => {
  if (!url) {
    throw new Error(`La variable de entorno ${urlName} no está definida.`);
  }

  try {
    new URL(url);
  } catch {
    throw new Error(
      `La variable de entorno ${urlName} tiene un formato inválido: ${url}`
    );
  }

  return url;
};

export const API_URL = validateUrl(
  import.meta.env.VITE_API_URL,
  "VITE_API_URL"
);
export const LOGIN_URL = validateUrl(
  import.meta.env.VITE_API_LOGIN_URL,
  "VITE_API_LOGIN_URL"
);
export const REGISTER_URL = validateUrl(
  import.meta.env.VITE_API_REGISTER_URL,
  "VITE_API_REGISTER_URL"
);
export const USER_EMAIL_URL = validateUrl(
  import.meta.env.VITE_API_USER_EMAIL_URL,
  "VITE_API_USER_EMAIL_URL"
);

if (!API_URL || !LOGIN_URL || !REGISTER_URL || !USER_EMAIL_URL) {
  throw new Error("Las URLs de la API no están configuradas correctamente.");
}
