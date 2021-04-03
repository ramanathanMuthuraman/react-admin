import { useState, useEffect } from "react";
import useAPIError from "./useAPIError";
import useLoader from "./useLoader";
import request from "../utils/serviceUtils";

function useFetch(options) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { addError } = useAPIError();
  const { setGlobalSpinner } = useLoader;
  setLoading(true);
  setGlobalSpinner(true);
  request(options)
    .then((res) => {
      setResponse(res.data);
      setLoading(false);
    })
    .catch((error) => {
      setHasError(true);
      setLoading(false);
      addError();
    })
    .finally(() => {
      setGlobalSpinner(false);
    });

  return { response, loading, hasError };
}

export default useFetch;
