import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import consultaAxios from "../../../config/axios";
import Spinner from "../../components/Spinner";
import useChelas from "../../hooks/useChelas";

const IniciarSesion = () => {
  const navigate = useNavigate();
  const { setUsuarioLogeado } = useChelas();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarDatos = async (e) => {
    e.preventDefault();
    setCargando(true);

    const datosRegistro = {
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    };

    try {
      const resultado = await consultaAxios.post(
        "/aut/iniciar-sesion",
        datosRegistro
      );

      const { id, nombre, apellido, token } = resultado.data.userEncontrado;
      setUsuarioLogeado(JSON.stringify({ id, nombre, apellido }));

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify({ id, nombre, apellido }));

      setEmail("");
      setPassword("");

      Swal.fire("¡INICIADO SESIÓN!", resultado.data.msg, "success");
      navigate("/");
    } catch (error) {
      console.log(error);

      error.response.data.msg &&
        Swal.fire({
          icon: "error",
          title: "HA OCURRIDO UN ERROR",
          text: error.response.data.msg || error.message,
        });
    }
    setCargando(false);
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-5 px-5">
      <h2 className="uppercase font-bold text-4xl">Iniciar Sesión</h2>

      <div className="flex flex-col justify-center items-center gap-9 border-2 rounded-xl border-slate-300 dark:border-slate-800 px-5 py-3 w-full min-h-[500px] sm:w-[500px]">
        <i className="fa-solid fa-user text-7xl" />

        <form
          onSubmit={enviarDatos}
          className="w-full flex flex-col justify-center items-stretch gap-8 "
        >
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />

          <input
            type="submit"
            value="INICIAR SESIÓN"
            className="bg-slate-900 dark:bg-slate-50 text-white dark:text-black uppercase font-bold rounded-full px-4 py-3 text-center"
          />

          <Link
            to="/auth/registrarse"
            className="m-2 uppercase font-bold text-blue-400 hover:text-blue-600"
          >
            Registrarme
          </Link>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;
