import { CircleX } from "lucide-react";

type FeedbackModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
};

export default function FeedbackModal({
  isOpen,
  title = "Something went wrong",
  message,
  onClose,
}: FeedbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md flex flex-col items-center justify-center gap-1 rounded-xl shadow-lg px-6 py-12">
        <CircleX
          size={70}
          className="text-red-600 bg-red-200 p-1 rounded-full"
        />

        <h2 className="text-xl font-bold text-red-600 mb-3">{title}</h2>

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="w-9/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
