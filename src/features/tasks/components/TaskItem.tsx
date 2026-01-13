import type { Task } from "../types/TaskTypes";
import { Circle, CircleCheck, StickyNote, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { formatDueDate } from "../utils/DateUtils";

interface TaskItemProps {
  task: Task;
  onToggleCompleted: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onSelect: (task: Task) => void;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.97,
    transition: {
      duration: 0.15,
    },
  },
};

export default function TaskItem({
  task,
  onToggleCompleted,
  onToggleImportant,
  onSelect,
}: TaskItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(task)}
      className="bg-gray-700 h-16 flex gap-3 items-center px-4 py-4 rounded-xl hover:bg-gray-600 transition-colors"
    >

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleCompleted(task.id);
        }}
        className="group relative w-6 h-6 flex items-center justify-center hover:cursor-pointer"
      >
        {task.completed ? (
          <CircleCheck className="text-green-400" />
        ) : (
          <>
            <Circle className="group-hover:opacity-0 transition" />
            <CircleCheck className="absolute opacity-0 group-hover:opacity-100 transition text-green-400" />
          </>
        )}
      </button>


      <div className="flex flex-col justify-center">
        <p className="font-medium">{task.title}</p>

        {task.description && (
          <div className="text-xs text-gray-300 flex items-center gap-1">
            <StickyNote size={12} />
            <span>Description</span>
          </div>
        )}
      </div>


      <div className="ml-auto flex items-center gap-3">
        <p className="text-sm text-gray-400">
          {formatDueDate(task.due_date || "")}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleImportant(task.id);
          }}
          className="relative w-6 h-6 flex items-center justify-center hover:cursor-pointer"
        >
          {task.important ? (
            <Star fill="#FFE400" className="text-yellow-400" />
          ) : (
            <>
              <Star className="transition hover:opacity-0" />
              <Star className="absolute opacity-0 hover:opacity-100 transition text-yellow-400" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
