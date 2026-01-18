export function validateName(name: string): string | null {
  if (!name.trim()) return "Name is required";

  if (!/^[\p{L}\s]{2,}$/u.test(name)) {
    return "Name must be at least 2 characters and contain only letters";
  }

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password.trim()) return "Password is required";

  if (!/^(?=.*[0-9]).{8,}$/.test(password)) {
    return "Password must be at least 8 characters and contain at least one number";
  }

  return null;
}
