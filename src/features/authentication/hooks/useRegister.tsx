import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authServices } from "../services/authServices";
import { validateRegisterForm } from "../validators/authForm";
import { useAuthForm } from "./useAuthForm";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function useRegister() {
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleSubmit,
    clearApiError,
  } = useAuthForm<RegisterFormData>();

  const { name, email, password } = formData;

  async function register() {
    await authServices.register(name, email, password);

    toast.success("Registration successful! You can now log in.");
    navigate("/");
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(register, validateRegisterForm);
  }

  return {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleRegister,
    clearApiError,
  };
}
