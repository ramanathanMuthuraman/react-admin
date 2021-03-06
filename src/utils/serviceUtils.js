// https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb

import axios from "axios";
import { BASE_URL } from "../config/urlConfig";

const client = axios.create({
  baseURL: BASE_URL,
});

const request = function (options) {
  const onSuccess = function (response) {
    console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = function (error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  const token = sessionStorage.getItem("id_token");
  const { headers, ...rest } = options;
  const defaultOptions = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      ...headers,
    },
  };
  return client({ ...defaultOptions, ...rest })
    .then(onSuccess)
    .catch(onError);
};

export default request;
