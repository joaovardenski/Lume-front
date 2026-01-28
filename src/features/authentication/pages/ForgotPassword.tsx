import useForgotPassword from "../hooks/useForgotPassword";
import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import SubmitAuthButton from "../components/SubmitAuthButton";
import LinkAuth from "../components/LinkAuth";
import FeedbackModal from "../../shared/components/FeedbackModal";

export default function ForgotPassword() {
  const {
    formData,
    setFormData,
    errors,
    apiError,
    isSubmitting,
    handleForgotPassword,
    clearApiError,
  } = useForgotPassword();

  return (
    <AuthContainer
      title="Forgot Password"
      navigation={
        <div className="flex flex-col text-center gap-2">
          <LinkAuth link="/" text="Back to Login" />
        </div>
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
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <SubmitAuthButton
          title="Send recovery link"
          onClick={handleForgotPassword}
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

