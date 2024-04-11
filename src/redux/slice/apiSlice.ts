import Axios from "axios";

const baseURL = "http://localhost:5000/";

export function AxiosJSON() {
  const axios = Axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return axios;
}

export function AxiosFormData() {
  const axios = Axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return axios;
}
