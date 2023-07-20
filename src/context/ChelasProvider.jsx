import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import consultaAxios from "../../config/axios";

const ChelasContext = createContext();

// eslint-disable-next-line react/prop-types
const ChelasProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [usuarioLogeado, setUsuarioLogeado] = useState({});
  const [chelas, setChelas] = useState([]);
  const [banderaUsuarioLogeado, setBanderaUsuarioLogeado] = useState(false);
  const [mostrarNav, setMostrarNav] = useState(false);
  const [banderaChela, setBanderaChela] = useState(false);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    let usuario;

    if (localStorage.getItem("usuario")) {
      usuario = localStorage.getItem("usuario");
      usuario = JSON.parse(usuario);
    }

    setUsuarioLogeado(usuario);
  }, [banderaUsuarioLogeado]);

  useEffect(() => {
    if (banderaUsuarioLogeado) {
      setMostrarNav(true);
    }
  }, [banderaUsuarioLogeado]);

  useEffect(() => {
    const obtenerChelas = async () => {
      try {
        const respuesta = await consultaAxios.get("/chela/obtener-chelas");
        setChelas(respuesta.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "HA OCURRIDO UN ERROR",
          text: error.message,
        });
      }
    };

    obtenerChelas();
  }, [banderaChela]);

  const darkModeFunction = () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      localStorage.removeItem("theme");
      setDarkMode(false);
    }
  };

  return (
    <ChelasContext.Provider
      value={{
        darkMode,
        usuarioLogeado,
        chelas,
        mostrarNav,
        banderaUsuarioLogeado,
        banderaChela,

        setDarkMode,
        setUsuarioLogeado,
        setChelas,
        setMostrarNav,
        setBanderaUsuarioLogeado,
        setBanderaChela,

        darkModeFunction,
      }}
    >
      {children}
    </ChelasContext.Provider>
  );
};

export { ChelasProvider };
export default ChelasContext;
