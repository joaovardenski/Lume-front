import { X, Trash, Calendar, AlignLeft, Clock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.aside
        className="
          fixed md:static z-50
          bottom-0 right-0
          w-full md:w-96
          h-[92%] md:h-auto
          bg-gray-900
          rounded-t-2xl md:rounded-2xl
          p-6
          flex flex-col
          shadow-2xl
        "
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info: PanInfo) => {
          if (info.offset.y > 120) onClose();
        }}

      >
        <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4 md:hidden" />

        <header className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-semibold text-white">
            Task details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X />
          </button>
        </header>

        <section className="flex-1 overflow-y-auto flex flex-col gap-5 px-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Title</label>
            <input
              className="
                bg-gray-800
                px-3 py-2
                rounded-lg
                outline-none
                text-white
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
              "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <AlignLeft size={14} /> Description
            </label>
            <textarea
              className="
                bg-gray-800
                px-3 py-2
                rounded-lg
                resize-none
                text-white
                focus:outline-2 focus:outline-blue-500
              "
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar size={14} /> Due date
            </label>
            <input
              type="date"
              className="
                bg-gray-800
                w-full
                px-3 py-2
                rounded-lg
                outline-none
                text-white
                focus:ring-2 focus:ring-blue-500
              "
              value={
                dueDate
                  ? new Date(dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </section>

        <footer className="mt-6 flex flex-col gap-4">
          <div className="p-6 bg-gray-900 border-t border-gray-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              <span>Created at {formatDateTime(task.created_at)}</span>
            </div>
            
            <button
              onClick={() => onDeleteTask(task.id)}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors p-1"
              title="Delete task"
            >
              <Trash size={16} />
              <span className="font-medium">Delete</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            Salve changes
          </button>
        </div>
        </footer>
      </motion.aside>
    </AnimatePresence>
  );
}
