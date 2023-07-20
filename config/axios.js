import axios from "axios";

const consultaAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export default consultaAxios;
