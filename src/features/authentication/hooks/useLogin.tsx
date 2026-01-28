import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "./useAuthForm";
import { AuthContext } from "../contexts/AuthContext";
import { validateLoginForm } from "../validators/authForm";
import { authServices } from "../services/authServices";

interface LoginFormData {
  email: string;
  password: string;
}

export default function useLogin() {
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);

  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleSubmit,
    clearApiError,
  } = useAuthForm<LoginFormData>();

  const { email, password } = formData;

  async function login() {
    await authServices.login(email, password);
    await refreshUser();
    navigate("/home");
  }

  return {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleLogin: (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit(login, validateLoginForm);
    },
    clearApiError,
  };
}
