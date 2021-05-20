import { useAppContext } from "../../../context";

export const useNavBar = () => {
  const { setToken, setAuth, usuario } = useAppContext();

  const nav = ["usuarios", "inventario", "prestamo", "devolucion"];
  const menu = [
    { link: "/config/bibliotecas", label: "Configuración", icon: "setting" },
    {
      ref: "https://github.com/luis-tapiaa/circula",
      label: "Ayuda",
      icon: "help"
    },
    {
      action: () => {
        setToken();
        setAuth({});
      },
      label: "Cerrar Sesión",
      icon: "logout"
    }
  ];

  const foto = usuario.foto
    ? usuario.foto
    : "https://luis-tapiaa.github.io/icons-host/icons/profile.jpg";
  return { foto, menu, nav, usuario };
};
