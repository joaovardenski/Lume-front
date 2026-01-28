import { useState } from "react";

import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import SubmitAuthButton from "../components/SubmitAuthButton";
import LinkAuth from "../components/LinkAuth";
import FeedbackModal from "../../shared/components/FeedbackModal";

import useRecoverPassword from "../hooks/useRecoverPassword";

export default function RecoverPassword() {
  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleRecoverPassword,
    clearApiError,
  } = useRecoverPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthContainer
      title="Recover Password"
      navigation={
        <div className="flex flex-col text-center gap-2">
          <LinkAuth link="/" text="Back to Login" />
        </div>
      }
    >
      <form className="w-full flex flex-col items-center gap-4">
        <AuthInput
          label="New Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your new password"
          value={formData.password}
          error={errors.password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <AuthInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <SubmitAuthButton
          title="Recover Password"
          onClick={handleRecoverPassword}
          isSubmitting={isSubmitting}
        />
      </form>

      {apiError && (
        <FeedbackModal
          isOpen
          message={apiError}
          onClose={clearApiError}
        />
      )}
    </AuthContainer>
  );
}
