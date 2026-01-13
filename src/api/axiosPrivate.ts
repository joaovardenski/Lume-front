import axiosBase from "./axios";

const axiosPrivate = axiosBase;

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized");
    }

    return Promise.reject(error);
  },
);

export default axiosPrivate;
