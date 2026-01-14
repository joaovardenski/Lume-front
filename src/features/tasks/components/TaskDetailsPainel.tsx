import { X, Trash } from "lucide-react";
import { useState } from "react";
import type { Task } from "../types/TaskTypes";
import { formatDateTime } from "../utils/DateUtils";

interface Props {
  task: Task;
  onClose: () => void;
  onUpdateTask: (
    id: number,
    title: string,
    description: string,
    dueDate: string | null,
  ) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

export default function TaskDetailsPanel({
  task,
  onClose,
  onUpdateTask,
  onDeleteTask,
}: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [dueDate, setDueDate] = useState(task.due_date ?? null);

  function handleSave() {
    if (!title.trim() || title.trim().length < 2) return;
    onUpdateTask(task.id, title, description, dueDate);
    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      <aside
        className={`
          fixed md:static z-50
          bottom-0 md:bottom-auto
          right-0
          w-full md:w-96
          h-[90%] md:h-auto
          bg-gray-800
          rounded-t-2xl md:rounded-xl
          p-6
          flex flex-col gap-4
        `}
      >
        <div className="w-12 h-1.5 bg-gray-500 rounded-full mx-auto mb-2 md:hidden" />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Task details</h2>
          <button onClick={onClose} className="hover:cursor-pointer">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
          <input
            className="bg-gray-700 p-2 rounded outline-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="bg-gray-700 p-2 rounded resize-none outline-0"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            type="date"
            className="bg-gray-700 p-2 rounded outline-0"
            value={dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 font-semibold py-2 rounded hover:cursor-pointer"
          >
            Save
          </button>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Created at: {formatDateTime(task.created_at)}</p>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="hover:text-red-500 hover:cursor-pointer"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
