import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import consultaAxios from "../../../config/axios";
import useChelas from "../../hooks/useChelas";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const MiPerfil = () => {
  const navigate = useNavigate();

  const [miUsuario, setMiUsuario] = useState({});
  const [cargando, setCargando] = useState(false);

  const { usuarioLogeado, setUsuarioLogeado, setChelas, setMostrarNav } =
    useChelas();
  const { id } = usuarioLogeado;

  useEffect(() => {
    const obtenerMiUsuario = async (id) => {
      setCargando(true);
      try {
        const respuesta = await consultaAxios.get(`/aut/mi-usuario/${id}`);

        setMiUsuario(respuesta.data);
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "OCURRIÓ UN ERROR AL OBTENER TU USUARIO",
          text: error.message,
        });
      }
      setCargando(false);
    };

    obtenerMiUsuario(id);
  }, [id]);

  const EliminarPerfil = async (id) => {
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
          consultaAxios.delete(`/aut/eliminar-perfil/${id}`, config);

          //* Eliminar todos los datos.
          setChelas([]);
          setUsuarioLogeado({});
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          setMostrarNav(false);
          Swal.fire(
            "¡CUENTA BORRADA!",
            "Tu perfil se borro exitosamente",
            "success"
          );

          navigate("/auth");
        }
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "HA OCURRIDO UN ERROR",
        text: error.response.data.msg || error.message,
      });
      navigate("/auth");
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="w-full sm:w-[600px] flex-1 px-10 py-5">
      <div className="w-full px-5 py-3 border dark:border-slate-800 rounded-md shadow-md dark:shadow-slate-500 flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="w-full text-xl uppercase px-2">
          <p className="font-bold">
            Nombre:{" "}
            <span className="capitalize font-light">{miUsuario.nombre}</span>
          </p>
          <p className="font-bold">
            Apellido:{" "}
            <span className="capitalize font-light">{miUsuario.apellido}</span>
          </p>
          <p className="font-bold">
            Email:{" "}
            <span className="lowercase font-light">{miUsuario.email}</span>
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
          <Link
            to={`/editar-perfil/${miUsuario._id}`}
            className="w-full bg-blue-300 text-blue-700 hover:text-blue-300 hover:bg-blue-700 px-3 py-2 rounded-xl font-bold text-center"
          >
            <button className="uppercase">Editar</button>
          </Link>
          <button
            className="w-full bg-red-300 text-red-700 hover:text-red-300 hover:bg-red-700 px-3 py-2 rounded-xl font-bold uppercase"
            onClick={() => {
              EliminarPerfil(miUsuario._id);
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
