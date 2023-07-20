import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChelasProvider } from "./context/ChelasProvider";

import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";

import IniciarSesion from "./pages/auth/IniciarSesion";
import Registrarse from "./pages/auth/Registrarse";

import Index from "./pages/public/Index";
import AgregarChela from "./pages/public/AgregarChela";
import EditarChela from "./pages/public/EditarChela";

import MiPerfil from "./pages/public/MiPerfil";
import EditarPerfil from "./pages/public/auth/EditarPerfil";

function App() {
  return (
    <BrowserRouter>
      <ChelasProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index />} />
            <Route path="/agregar-chela" element={<AgregarChela />} />
            <Route path="/editar-chela/:id" element={<EditarChela />} />
            <Route path="/mi-perfil/:id" element={<MiPerfil />} />
            <Route path="/editar-perfil/:id" element={<EditarPerfil />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<IniciarSesion />} />
            <Route path="/auth/registrarse" element={<Registrarse />} />
          </Route>
        </Routes>
      </ChelasProvider>
    </BrowserRouter>
  );
}

export default App;

/*
APOYARME EN ESTÁ PÁGINA
https://github.com/CJavat/curso-react-udemy2/tree/master/uptask_mern/frontend/src
*/
