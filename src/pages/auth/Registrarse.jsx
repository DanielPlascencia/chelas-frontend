import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import consultaAxios from "../../../config/axios";
import Spinner from "../../components/Spinner";

const Registrarse = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarDatos = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      return Swal.fire({
        icon: "error",
        title: "HA OCURRIDO UN ERROR",
        text: "Contraseñas no coinciden",
      });
    }

    const datosRegistro = { nombre, apellido, email, password };
    setCargando(true);
    try {
      const resultado = await consultaAxios.post(
        "/aut/registrarse",
        datosRegistro
      );

      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");
      setRePassword("");

      Swal.fire(
        "¡TE HAS REGISTRADO CORRECTAMENTE!",
        resultado.data.msg,
        "success"
      );

      navigate("/auth");
    } catch (error) {
      console.log(error.message);

      error.message === "Request failed with status code 400" &&
        Swal.fire({
          icon: "error",
          title: "HA OCURRIDO UN ERROR",
          text: error.response.data.msg,
        });

      (error.message === "Network Error") &
        Swal.fire({
          icon: "error",
          title: "HA OCURRIDO UN ERROR",
          text: "ERROR DE CONEXIÓN",
        });
    }
    setCargando(false);
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-5 px-5">
      <h2 className="uppercase font-bold text-4xl">Crea una cuenta</h2>

      <div className="flex flex-col justify-center items-center border-2 rounded-xl border-slate-300 dark:border-slate-800 px-5 py-3 w-full min-h-[500px] sm:w-[500px]">
        <i className="fa-solid fa-user-plus text-7xl" />

        <form
          onSubmit={enviarDatos}
          className="w-full flex-1 flex flex-col justify-center items-stretch gap-8 "
        >
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="NOMBRE"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="outline-none w-1/2 border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
              required
            />
            <input
              type="text"
              placeholder="APELLIDO"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-1/2 outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
              required
            />
          </div>
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
            type="password"
            placeholder="CONFIRMAR PASSWORD"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />

          <input
            type="submit"
            value="REGISTRARME"
            className="bg-slate-900 dark:bg-slate-50 text-white dark:text-black uppercase font-bold rounded-full px-4 py-3 text-center"
          />
        </form>
      </div>
    </div>
  );
};

export default Registrarse;
