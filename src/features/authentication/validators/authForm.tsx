import {
  validateName,
  validateEmail,
  validatePassword,
} from "./authValidators";
import type { ValidationErrors } from "../types/validationTypes";

export function validateLoginForm(data: {
  email: string;
  password: string;
}): ValidationErrors<typeof data> {
  const errors: ValidationErrors<typeof data> = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateRegisterForm(data: {
  name: string;
  email: string;
  password: string;
}): ValidationErrors<typeof data> {
  const errors: ValidationErrors<typeof data> = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateForgotPasswordForm(data: {
  email: string;
}): ValidationErrors<typeof data> {
  const errors: ValidationErrors<typeof data> = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  return errors;
}

export function validateResetPasswordForm(data: {
  password: string;
  confirmPassword: string;
}): ValidationErrors<typeof data> {
  const errors: ValidationErrors<typeof data> = {};

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
