import { useState } from "react";
import { getApiErrorMessage } from "../../shared/utils/getApiErrorMessage";

export function useAuthForm<T>() {
  const [formData, setFormData] = useState<T>({} as T);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  async function handleSubmit(
    submitFn: () => Promise<void>,
    validate?: (data: T) => Partial<T>,
  ) {
    if (isSubmitting) return;

    if (validate) {
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await submitFn();
      setErrors({});
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearApiError() {
    setApiError(null);
  }

  return {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleSubmit,
    clearApiError,
  };
}
