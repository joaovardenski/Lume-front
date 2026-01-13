import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import SubmitAuthButton from "../components/SubmitAuthButton";
import LinkAuth from "../components/LinkAuth";
import { validateForgotPasswordForm } from "../validators/authForm";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForgotPasswordForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    alert("Password reset link sent to your email!");
  };

  return (
    <AuthContainer
      title="Forgot Password"
      navigation={
        <>
          <LinkAuth link="/" text="Back to Login" />
        </>
      }
    >
      <form className="w-full flex flex-col items-center gap-4">
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          error={errors.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <SubmitAuthButton
          title="Forgot Password"
          onClick={handleForgotPassword}
        />
      </form>
    </AuthContainer>
  );
}
