import { useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";

function useAPILoader() {
  const { setGlobalSpinner } = useContext(LoaderContext);
  return { setGlobalSpinner };
}

export default useAPILoader;
