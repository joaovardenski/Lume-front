import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import SubmitAuthButton from "../components/SubmitAuthButton";
import LinkAuth from "../components/LinkAuth";
import { validateResetPasswordForm } from "../validators/authForm";

export default function RecoverPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateResetPasswordForm(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setError({});
    alert("Password recovered successfully!");
  };

  return (
    <AuthContainer
      title="Recover Password"
      navigation={
        <>
          <LinkAuth link="/" text="Back to Login" />
        </>
      }
    >
      <form className="w-full flex flex-col items-center gap-4">
        <AuthInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={error.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Enter your password again"
          value={formData.confirmPassword}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
          error={error.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <SubmitAuthButton
          title="Recover Password"
          onClick={handleRecoverPassword}
        />
      </form>
    </AuthContainer>
  );
}
