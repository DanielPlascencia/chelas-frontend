import { Link, useLocation, useNavigate } from "react-router-dom";
import logoChelas from "../assets/favicon.png";
import useChelas from "../hooks/useChelas";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    darkMode,
    usuarioLogeado,
    mostrarNav,
    setUsuarioLogeado,
    setChelas,
    setBanderaUsuarioLogeado,
    setMostrarNav,
    setBanderaChela,
    darkModeFunction,
  } = useChelas();

  const cerrarSesion = () => {
    setUsuarioLogeado({});
    setChelas([]);
    setBanderaUsuarioLogeado(false);
    setBanderaChela(false);
    setMostrarNav(false);

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/auth");
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-800 w-full flex flex-col gap-2 justify-center min-h-20 py-5 sticky top-0">
      <div className="flex justify-around items-center">
        <Link to="/">
          <div className="flex justify-center items-center gap-2">
            <img
              src={logoChelas}
              alt="Logo Chelas"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <h1 className="text-3xl md:text-4xl font-bold uppercase">Chelas</h1>
          </div>
        </Link>

        <button onClick={darkModeFunction}>
          {darkMode ? (
            <i className="fa-solid fa-sun fa-shake text-4xl md:text-5xl" />
          ) : (
            <i className="fa-solid fa-moon fa-shake text-4xl md:text-5xl" />
          )}
        </button>
      </div>

      {mostrarNav ? (
        <div className="flex flex-wrap justify-between items-center gap-5 px-5">
          <Link
            to={`/mi-perfil/${usuarioLogeado?.id}`}
            className="font-bold uppercase text-lg text-black dark:text-white "
          >
            <div>
              <p
                className={`hover:text-red-600 ${
                  location.pathname === `/mi-perfil/${usuarioLogeado?.id}` &&
                  "text-red-600"
                }`}
              >
                {usuarioLogeado?.nombre} {usuarioLogeado?.apellido}
              </p>
            </div>
          </Link>

          <nav>
            <ul className="flex gap-5 font-bold text-black dark:text-white">
              <li
                className={`hover:text-red-600 ${
                  location.pathname === `/agregar-chela` && "text-red-600"
                }`}
              >
                <Link to="/agregar-chela">AGREGAR CHELA</Link>
              </li>
            </ul>

            <button onClick={cerrarSesion} className="text-blue-500 uppercase">
              Cerrar Sesión
            </button>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
