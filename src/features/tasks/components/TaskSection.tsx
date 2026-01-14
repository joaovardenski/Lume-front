import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import type { Task } from "../types/TaskTypes";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  isOpen: boolean;
  onToggle: () => void;
  emptyMessage: string;
  onToggleCompleted: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onSelectTask: (task: Task) => void;
}

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export default function TaskSection({
  title,
  tasks,
  isOpen,
  onToggle,
  emptyMessage,
  onToggleCompleted,
  onToggleImportant,
  onSelectTask,
}: TaskSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-left group"
      >
        <motion.span
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown size={28} />
        </motion.span>

        <h2 className="text-2xl font-semibold flex items-center gap-1">
          <span>{title}</span>
          {tasks.length > 0 && (
            <span>({tasks.length})</span>
          )}
        </h2>
      </button>

      {isOpen && tasks.length === 0 && (
        <p className="text-gray-400 text-sm italic text-center py-4">
          {emptyMessage}
        </p>
      )}

      <AnimatePresence initial={false}>
        {isOpen && tasks.length > 0 && (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3 overflow-hidden"
          >
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleCompleted={onToggleCompleted}
                onToggleImportant={onToggleImportant}
                onSelect={onSelectTask}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
