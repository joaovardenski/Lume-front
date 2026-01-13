import AuthContainer from "../components/AuthContainer";
import AuthInput from "../components/AuthInput";
import SubmitAuthButton from "../components/SubmitAuthButton";
import LinkAuth from "../components/LinkAuth";
import FeedbackModal from "../../shared/components/FeedbackModal";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    errors,
    apiError,
    setApiError,
    isSubmiting,
    handleLogin,
  } = useLogin();

  return (
    <AuthContainer
      title="Login"
      navigation={
        <>
          <LinkAuth
            link="/register"
            text="Don't have an account? Click here to register"
          />
          <LinkAuth link="/forgot-password" text="Forgot your password?" />
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
          title="Login"
          onClick={handleLogin}
          isSubmiting={isSubmiting}
        />
      </form>

      {apiError && (
        <FeedbackModal
          isOpen
          message={apiError}
          onClose={() => setApiError(null)}
        />
      )}
    </AuthContainer>
  );
}
