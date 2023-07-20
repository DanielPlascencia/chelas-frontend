import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import consultaAxios from "../../../config/axios";
import Spinner from "../../components/Spinner";
import useChelas from "../../hooks/useChelas";

const AgregarChela = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [gradosAlcohol, setGradosAlcohol] = useState("");
  const [precio, setPrecio] = useState("");
  const [cargando, setCargando] = useState(false);

  const { chelas, setChelas } = useChelas();

  const enviarDatos = async (e) => {
    e.preventDefault();

    const datosRegistro = { nombre, marca, tipo, gradosAlcohol, precio };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    setCargando(true);
    try {
      const resultado = await consultaAxios.post(
        "/chela/registar-chela",
        datosRegistro,
        config
      );

      setNombre("");
      setMarca("");
      setTipo("");
      setGradosAlcohol("");
      setPrecio("");

      setChelas([...chelas, resultado.data.chelaCreada]);

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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />
          <input
            type="text"
            placeholder="MARCA"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />
          <input
            type="text"
            placeholder="TIPO"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />
          <input
            type="number"
            placeholder="GRADOS DE ALCOHOL"
            value={gradosAlcohol}
            onChange={(e) => setGradosAlcohol(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />
          <input
            type="number"
            placeholder="PRECIO"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="outline-none border-b-2 bg-transparent border-b-slate-300 dark:border-b-slate-800 focus:border-b-black dark:focus:border-b-white placeholder:text-xs focus:placeholder:text-black dark:focus:placeholder:text-white required:border-b-red-600 valid:border-b-green-600 invalid:border-b-red-600"
            required
          />

          <input
            type="submit"
            value="AGREGAR CHELA"
            className="bg-slate-900 dark:bg-slate-50 text-white dark:text-black uppercase font-bold rounded-full px-4 py-3 text-center"
          />
        </form>
      </div>
    </div>
  );
};

export default AgregarChela;
