import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { validateLoginForm } from "../validators/authForm";
import { authServices } from "../services/authServices";
import { getApiErrorMessage } from "../../shared/utils/getApiErrorMessage";

export default function useLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmiting) return;

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmiting(true);
      await authServices.login(formData.email, formData.password);
      await refreshUser();
      setErrors({});
      navigate("/home");
    } catch (error) {
      setIsSubmiting(false);
      setApiError(getApiErrorMessage(error));
    }
  };

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    errors,
    apiError,
    setApiError,
    isSubmiting,
    handleLogin,
  };
}
