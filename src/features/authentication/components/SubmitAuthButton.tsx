import { Loader2Icon } from "lucide-react";

interface SubmitAuthButtonProps {
  title: string;
  onClick: (e: React.FormEvent) => void;
  isSubmiting: boolean;
}

export default function SubmitAuthButton({
  title,
  onClick,
  isSubmiting,
}: SubmitAuthButtonProps) {
  return (
    <button
      type="submit"
      className={`mt-6 w-full flex items-center justify-center bg-primary text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-primary/90 hover:scale-101 hover:shadow-lg transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isSubmiting ? "bg-primary/90" : ""}`}
      onClick={onClick}
      disabled={isSubmiting}
    >
      {isSubmiting ? <Loader2Icon size={20} className="animate-spin" /> : title}
    </button>
  );
}
