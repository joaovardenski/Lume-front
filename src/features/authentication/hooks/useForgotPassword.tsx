import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthForm } from "./useAuthForm";
import { validateForgotPasswordForm } from "../validators/authForm";
// import { authServices } from "../services/authServices";

interface ForgotPasswordFormData {
  email: string;
}

export default function useForgotPassword() {
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleSubmit,
    clearApiError,
  } = useAuthForm<ForgotPasswordFormData>();

  async function forgotPassword() {
    // await authServices.forgotPassword(formData.email);

    toast.success("Password reset link sent to your email!");
    navigate("/");
  }

  function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(forgotPassword, validateForgotPasswordForm);
  }

  return {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleForgotPassword,
    clearApiError,
  };
}
