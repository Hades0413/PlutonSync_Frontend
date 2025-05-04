import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  Clock,
  DollarSign,
  User,
  LogOut,
} from "lucide-react";
import Logo from "../../../assets/images/logo.png";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onSidebarToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarToggle }) => {
  const [user /*setUser*/] = useState<{
    username: string;
    email: string;
  } | null>(null);
  /*
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const onLogout = () => {
    //localStorage.removeItem("user");
    window.location.href = "/";
  };
  */
  return (
    <div className="relative">
      {/* Toggle */}
      <div className="fixed top-4 left-2 z-50 flex flex-col items-start gap-2 w-[70px]">
        {/* Botón */}
        <button
          className="p-2 bg-white rounded-md shadow"
          onClick={onSidebarToggle}
        >
          {isOpen ? (
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Logo + texto */}
        <div className="flex items-center gap-2 ">
          <img
            src={Logo}
            alt="Logo"
            className={`${styles.logo} ${
              isOpen ? styles.logoLarge : styles.logoSmall
            }`}
          />
          {isOpen && (
            <span className="text-white font-semibold text-sm whitespace-nowrap">
              Plutón Sync
            </span>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[var(--pluton-secondary)] text-white ${
          isOpen ? "w-64" : "w-[70px]"
        } pt-24 p-4 z-40 transition-all duration-300 flex flex-col justify-between`}
      >
        {/* Menú */}
        <nav className="flex flex-col gap-4  border-t border-gray-700 pt-6 mt-6">
          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard />}
            label="Dashboard"
            isOpen={isOpen}
          />
          <SidebarLink
            href="/tareas"
            icon={<ClipboardList />}
            label="Tareas"
            isOpen={isOpen}
          />
          <SidebarLink
            href="/proyectos"
            icon={<Briefcase />}
            label="Proyectos"
            isOpen={isOpen}
          />
          <SidebarLink
            href="/horarios"
            icon={<Clock />}
            label="Horarios"
            isOpen={isOpen}
          />
          <SidebarLink
            href="/finanzas"
            icon={<DollarSign />}
            label="Finanzas"
            isOpen={isOpen}
          />
        </nav>

        {/* Perfil del usuario */}
        <div className="mt-10 border-t border-gray-700 pt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm">
              {user?.username?.slice(0, 2).toUpperCase() || "??"}
            </div>
            {isOpen && user && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.username}</span>
                <span className="text-xs text-gray-400">{user.email}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <SidebarLink
              href="/perfil"
              icon={<User />}
              label="Mi Perfil"
              isOpen={isOpen}
            />
            <button /*
              onClick={onLogout}*/
              className="flex items-center gap-3 text-red-500 hover:text-red-300 text-sm transition"
            >
              <LogOut className="w-5 h-5" />
              {isOpen && <span>Cerrar Sesión</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  label,
  isOpen,
}) => (
  <a
    href={href}
    className="flex items-center gap-3 hover:text-teal-400 text-gray-300 transition text-sm"
  >
    <div className="w-6 h-6">{icon}</div>
    {isOpen && <span>{label}</span>}
  </a>
);

export default Sidebar;
