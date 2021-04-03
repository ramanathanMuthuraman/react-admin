// https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb

import axios from "axios";

const client = axios.create({});

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
  const defaultOptions = {
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  };
  return client({ ...defaultOptions, ...options })
    .then(onSuccess)
    .catch(onError);
};

export default request;
