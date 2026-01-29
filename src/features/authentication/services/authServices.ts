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

  forgotPassword: async (email: string) => {
    await axiosPublic.post("/forgot-password", { email });
  },

  resetPassword: async (
    token: string | null,
    newPassword: string
  ) => {
    await axiosPublic.post("/reset-password", {
      token,
      newPassword,
    });
  },

  me: async () => {
    const response = await axiosPrivate.get("/me");
    return response;
  },
};
