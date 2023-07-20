import { useEffect, useState } from "react";
import useChelas from "../../hooks/useChelas";

import Spinner from "../../components/Spinner";
import MostrarChela from "../../components/MostrarChela";

const Index = () => {
  const { chelas, setBanderaUsuarioLogeado } = useChelas();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    setBanderaUsuarioLogeado(true);
    setCargando(false);
  }, []);

  return cargando ? (
    <Spinner />
  ) : (
    <div className="flex-1">
      <h1 className="font-bold text-5xl mt-7 mb-16">TODAS LAS CHELAS</h1>
      <div className="flex flex-col gap-8 last-of-type:mb-10">
        {chelas && chelas.length > 0 ? (
          chelas.map((chela) => <MostrarChela key={chela._id} chela={chela} />)
        ) : (
          <p className="font-bold text-center bg-red-300 text-red-600 px-3 py-2 rounded-full mt-10">
            AÚN NO HAY CHELAS REGISTRADAS
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
