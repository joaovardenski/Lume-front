import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthForm } from "./useAuthForm";
import { validateResetPasswordForm } from "../validators/authForm";
import { authServices } from "../services/authServices";

interface RecoverPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function useRecoverPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleSubmit,
    clearApiError,
  } = useAuthForm<RecoverPasswordFormData>();
  

  async function recoverPassword() {
    await authServices.resetPassword(token, formData.confirmPassword);

    toast.success("Password updated successfully!");
    navigate("/");
  }

  function handleRecoverPassword(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(recoverPassword, validateResetPasswordForm);
  }

  return {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleRecoverPassword,
    clearApiError,
  };
}
