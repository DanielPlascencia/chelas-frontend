import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useChelas from "../../hooks/useChelas";
import consultaAxios from "../../../config/axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const EditarChela = () => {
  const navigate = useNavigate();
  const param = useParams();

  const { chelas, banderaChela, setChelas, setBanderaChela } = useChelas();

  const [cargando, setCargando] = useState(false);
  const [chelaActual, setChelaActual] = useState({});

  useEffect(() => {
    const obtenerChela = async () => {
      setCargando(true);
      try {
        const respuesta = await consultaAxios.get(
          `/chela/obtener-chela/${param.id}`
        );
        setChelaActual(respuesta.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "HA OCURRIDO UN ERROR",
          text: "ERROR DE CONEXIÓN",
        });
      }
      setCargando(false);
    };
    obtenerChela();
  }, []);

  const enviarDatos = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    setCargando(true);
    try {
      const resultado = await consultaAxios.put(
        `/chela/editar-chela/${param.id}`,
        chelaActual,
        config
      );

      const actualizarChelas = chelas.map((chelaState) =>
        chelaState._id === chelaActual._id ? chelaActual : chelaState
      );

      setChelas(actualizarChelas);
      setBanderaChela(!banderaChela);
      setChelaActual({});

      Swal.fire(
        "¡CHELA REGISTRADA CORRECTAMENTE!",
        resultado.data.msg,
        "success"
      );

      navigate("/");
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

  const actualizandoDatos = (e) => {
    setChelaActual({
      ...chelaActual,
      [e.target.name]: e.target.value,
    });
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-5 px-5">
      <h2 className="uppercase font-bold text-4xl">Crea una cuenta</h2>

      <div className="flex flex-col justify-center items-center border-2 rounded-xl border-slate-300 dark:border-slate-800 px-5 py-3 w-full min-h-[500px] sm:w-[500px]">
        <i className="fa-solid fa-beer-mug-empty fa-beat text-7xl" />

        <form
          onSubmit={enviarDatos}
          className="w-full flex-1 flex flex-col justify-center items-stretch gap-8 "
        >
          <input
            type="text"
            placeholder="NOMBRE DE LA CHELA"
            name="nombre"
            value={chelaActual?.nombre}
            onChange={actualizandoDatos}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
          />
          <input
            type="text"
            placeholder="MARCA"
            name="marca"
            value={chelaActual?.marca}
            onChange={actualizandoDatos}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
          />
          <input
            type="text"
            placeholder="TIPO"
            name="tipo"
            value={chelaActual?.tipo}
            onChange={actualizandoDatos}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
          />
          <input
            type="number"
            placeholder="GRADOS DE ALCOHOL"
            name="gradosAlcohol"
            value={chelaActual?.gradosAlcohol}
            onChange={actualizandoDatos}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white valid:border-b-green-600 invalid:border-b-red-600"
          />
          <input
            type="number"
            placeholder="PRECIO"
            name="precio"
            value={chelaActual?.precio}
            onChange={actualizandoDatos}
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

export default EditarChela;
