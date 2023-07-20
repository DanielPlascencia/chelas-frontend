import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import consultaAxios from "../../config/axios";
import { formatearMoneda } from "../helpers";
import useChelas from "../hooks/useChelas";
import { useEffect } from "react";

const MostrarChela = ({ chela }) => {
  const navigate = useNavigate();

  const { usuarioLogeado, chelas, banderaChela, setChelas, setBanderaChela } =
    useChelas();

  const {
    _id: idChela,
    nombre,
    marca,
    tipo,
    precio,
    gradosAlcohol,
    idUsuario,
  } = chela;

  const { id: idUsuarioLogeado } = usuarioLogeado;

  // useEffect(() => {
  //   setChelas(chelas);
  // }, [chelas]);

  const EliminarChela = async (idChela) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      Swal.fire({
        title: "¿Estás seguro de borrarlo?",
        text: "Si lo borras no podrás recuperarlo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, acepto borrarlo",
      }).then((result) => {
        if (result.isConfirmed) {
          consultaAxios.delete(`/chela/eliminar-chela/${idChela}`, config);
          const chelasActualizada = chelas.filter(
            (chelaState) => chelaState._id !== idChela
          );

          setChelas(chelasActualizada);
          // setBanderaChela(!banderaChela);

          Swal.fire(
            "¡CHELA BORRADA!",
            "El registro ha sido borrado.",
            "success"
          );
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "HA OCURRIDO UN ERROR",
        text: error.response.data.msg || error.message,
      });

      navigate("/");
    }
  };

  return (
    <div className="px-5 py-3 border dark:border-slate-800 rounded-md shadow-md dark:shadow-slate-500 flex flex-wrap justify-between items-center gap-5">
      <div className="flex-1  min-w-fit text-xl uppercase px-2">
        <p className="font-bold">
          nombre: <span className="capitalize font-light"> {nombre}</span>
        </p>
        <p className="font-bold">
          marca: <span className="capitalize font-light"> {marca}</span>
        </p>
        <p className="font-bold">
          tipo: <span className="capitalize font-light"> {tipo}</span>
        </p>
        <p className="font-bold">
          Grados de Alcohol:{" "}
          <span className="capitalize font-light"> {gradosAlcohol}%</span>
        </p>
        <p className="font-bold">
          precio:{" "}
          <span className="capitalize font-light">
            {" "}
            {formatearMoneda(precio)}
          </span>
        </p>
      </div>

      {idUsuario === idUsuarioLogeado && (
        <div className="flex justify-center items-center gap-3">
          <Link to={`/editar-chela/${idChela}`}>
            <button className="bg-blue-300 text-blue-700 hover:text-blue-300 hover:bg-blue-700 px-3 py-2 rounded-xl font-bold ">
              Editar
            </button>
          </Link>
          <button
            className="bg-red-300 text-red-700 hover:text-red-300 hover:bg-red-700 px-3 py-2 rounded-xl font-bold"
            onClick={() => {
              EliminarChela(idChela);
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default MostrarChela;
