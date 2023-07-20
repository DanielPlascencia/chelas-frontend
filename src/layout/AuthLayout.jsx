import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-black dark:text-white min-h-screen flex flex-col justify-center items-center relative">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
