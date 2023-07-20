import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import consultaAxios from "../../../../config/axios";
import Spinner from "../../../components/Spinner";
import useChelas from "../../../hooks/useChelas";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { usuarioLogeado } = useChelas();

  const [nombre, setNombre] = useState(usuarioLogeado.nombre);
  const [apellido, setApellido] = useState(usuarioLogeado.apellido);
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  //TODO: ACTUALIZAR TAMBIEN LOS DATOS DEL LOCALSTORAGE
  const enviarDatos = async (e) => {
    e.preventDefault();

    const datosRegistro = { nombre, apellido, password };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    setCargando(true);

    try {
      const resultado = await consultaAxios.put(
        `/aut/editar-perfil/${param.id}`,
        datosRegistro,
        config
      );

      setNombre("");
      setApellido("");
      setPassword("");

      Swal.fire(
        "CAMBIOS GUARDADOS CORRECTAMENTE!",
        resultado.data.msg,
        "success"
      );

      navigate(`/mi-perfil/${param.id}`);
    } catch (error) {
      console.log(error);

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
      <h2 className="uppercase font-bold text-4xl">Editar Perfil</h2>

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
              className="outline-none w-1/2 border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
            />
            <input
              type="text"
              placeholder="APELLIDO"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-1/2 outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
            />
          </div>

          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
          />

          <input
            type="submit"
            value="GUARDAR CAMBIOS"
            className="bg-slate-900 dark:bg-slate-50 text-white dark:text-black uppercase font-bold rounded-full px-4 py-3 text-center"
          />
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
