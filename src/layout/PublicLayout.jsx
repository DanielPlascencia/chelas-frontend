import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const PublicLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/auth");
    }

    setToken(localStorage.getItem("token"));
  }, []);

  return token ? (
    <div className="bg-slate-50 dark:bg-slate-900 text-black dark:text-white min-h-screen flex flex-col justify-center items-center relative">
      <Header />
      <Outlet />
    </div>
  ) : (
    navigate("/auth")
  );
};

export default PublicLayout;
