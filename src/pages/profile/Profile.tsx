import { useEffect, useState } from "react";
import { Save, Key } from "lucide-react";
import { getUserById } from "../../api/user/userApi";

interface User {
  id_usuario: number;
  username_usuario: string;
  nombre_completo_usuario: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      setError("No se encontró el usuario en el localStorage.");
      setLoading(false);
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData.id_usuario;

    const fetchUser = async () => {
      const data = await getUserById(userId);
      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message || "No se pudo obtener los datos del usuario.");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Cargando...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--pluton-background)] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
        <p className="text-gray-600">
          Gestiona tu información personal y configuración
        </p>

        <div className="flex gap-4 border-b pb-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer ${
              activeTab === "general"
                ? "bg-[var(--pluton-secondary)] text-white"
                : "bg-transparent text-gray-500 hover:bg-[var(--pluton-secondary)]"
            }`}
            onClick={() => setActiveTab("general")}
          >
            <Save size={16} />
            General
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer ${
              activeTab === "seguridad"
                ? "bg-[var(--pluton-secondary)] text-white"
                : "bg-transparent text-gray-500 hover:bg-[var(--pluton-secondary)]"
            }`}
            onClick={() => setActiveTab("seguridad")}
          >
            <Key size={16} />
            Seguridad
          </button>
        </div>

        {activeTab === "general" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Foto de perfil</h2>
              <p className="text-gray-600 mb-4">
                Tu foto será visible para otros usuarios
              </p>
              <button className="px-4 py-2 bg-[var(--pluton-background)] text-white rounded-md hover:bg-blue-700">
                Subir imagen
              </button>
            </div>

            <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border col-span-2">
              <h2 className="text-xl font-semibold mb-6">
                Información personal
              </h2>
              <p className="text-gray-600 mb-4">
                Actualiza tu información personal
              </p>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="text-gray-900">
                    {user?.nombre_completo_usuario}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre de usuario
                  </label>
                  <div className="text-gray-900">{user?.username_usuario}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="text-gray-900">{user?.email}</div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-4 py-2 text-white bg-[var(--pluton-background)] rounded-md flex items-center gap-2 hover:bg-blue-700">
                  <Save size={16} />
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "seguridad" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border col-span-2">
              <h2 className="text-xl font-semibold mb-6">Cambiar contraseña</h2>
              <p className="text-gray-600 mb-4">
                Actualiza tu contraseña para mantener tu cuenta segura
              </p>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Contraseña actual
                  </label>
                  <input type="password" className="p-2 border rounded-md" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nueva contraseña
                  </label>
                  <input type="password" className="p-2 border rounded-md" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Confirmar nueva contraseña
                  </label>
                  <input type="password" className="p-2 border rounded-md" />
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                    checked
                    readOnly
                  />
                  <label className="text-sm text-gray-600">
                    Actualizar contraseña
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-4 py-2 text-white bg-[var(--pluton-background)] rounded-md flex items-center gap-2 hover:bg-blue-700">
                  <Key size={16} />
                  Actualizar contraseña
                </button>
              </div>
            </div>

            <div className="bg-[var(--pluton-secondary)] p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Sesión</h2>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Dispositivo actual
                  </label>
                  <div className="text-gray-900">Navegador web - Safari</div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Última actividad
                  </label>
                  <div className="text-gray-900">1/5/2025, 21:26:09</div>
                </div>

                <button className="mt-6 px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
