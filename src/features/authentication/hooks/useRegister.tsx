import { useState } from "react";
import { validateRegisterForm } from "../validators/authForm";
import { authServices } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../shared/utils/getApiErrorMessage";

export default function useRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmiting) return;

    const validationErrors = validateRegisterForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmiting(true);
      await authServices.register(
        formData.name,
        formData.email,
        formData.password,
      );
      setErrors({});
      alert("Registration successful!");
      navigate("/");
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
    handleRegister,
  };
}
