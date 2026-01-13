import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface AuthInputProps {
  label: string;
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthInput({
  label,
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  showPassword,
  setShowPassword,
}: AuthInputProps) {
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className={`block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm
                     placeholder-gray-400 focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 text-sm md:text-md
                     ${error ? "border-red-500" : ""}`}
        />

        {type === "email" ? (
          <Mail
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        ) : (
          <Lock
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        {type === "password" && setShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
