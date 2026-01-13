import axiosPrivate from "../../../api/axiosPrivate";
import axiosPublic from "../../../api/axiosPublic";

export const authServices = {
  login: async (email: string, password: string) => {
    const response = await axiosPublic.post("/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await axiosPublic.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    await axiosPublic.post("/logout");
  },

  me: async () => {
    const response = await axiosPrivate.get("/me");
    return response;
  },
};
