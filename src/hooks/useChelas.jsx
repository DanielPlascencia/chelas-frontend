import { useContext } from "react";
import ChelasContext from "../context/ChelasProvider";

const useChelas = () => {
  return useContext(ChelasContext);
};

export default useChelas;
