import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import SubmitAuthButton from "../components/SubmitAuthButton";
import LinkAuth from "../components/LinkAuth";
import useRegister from "../hooks/useRegister";
import FeedbackModal from "../../shared/components/FeedbackModal";

export default function Register() {
  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleRegister,
    clearApiError,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthContainer
      title="Register"
      navigation={
        <div className="flex flex-col text-center gap-2">
          <LinkAuth
            link="/"
            text="Already have an account? Click here to sign"
          />
        </div>
      }
    >
      <form className="w-full flex flex-col items-center gap-4">
        <AuthInput
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          error={errors.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          error={errors.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          error={errors.password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <SubmitAuthButton
          title="Register"
          onClick={handleRegister}
          isSubmitting={isSubmitting}
        />
      </form>

      {apiError && (
        <FeedbackModal isOpen message={apiError} onClose={clearApiError} />
      )}
    </AuthContainer>
  );
}
