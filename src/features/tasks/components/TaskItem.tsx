import type { Task } from "../types/TaskTypes";
import { Circle, CircleCheck, StickyNote, Star, Calendar } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { formatDueDate } from "../utils/DateUtils";

interface TaskItemProps {
  task: Task;
  onToggleCompleted: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onSelect: (task: Task) => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -10 }
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
      layout="position"
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(task)}
      className={`
        group flex gap-4 items-center px-4 py-3 rounded-2xl cursor-pointer
        border border-transparent transition-all duration-200 h-18
        ${task.completed 
          ? "bg-gray-800/40 opacity-75 hover:bg-gray-800/60" 
          : "bg-gray-800 border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10"
        }
      `}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleCompleted(task.id);
        }}
        className="shrink-0 relative w-6 h-6 flex items-center justify-center transition-transform hover:scale-110"
      >
        {task.completed ? (
          <CircleCheck size={24} className="text-emerald-500 fill-emerald-500/10" />
        ) : (
          <>
            <Circle size={24} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
            <CircleCheck 
              size={24} 
              className="absolute opacity-0 hover:opacity-100 text-emerald-500 transition-opacity" 
            />
          </>
        )}
      </button>

      <div className="flex flex-col flex-1 min-w-0">
        <p className={`
          font-medium transition-all truncate
          ${task.completed ? "text-gray-500 line-through" : "text-gray-100"}
        `}>
          {task.title}
        </p>

        <div className="flex items-center gap-3 mt-0.5">
          {task.description && (
            <div className="text-[11px] font-medium text-gray-400 flex items-center gap-1 bg-gray-700/50 px-1.5 py-0.5 rounded">
              <StickyNote size={10} />
              <span>Notes</span>
            </div>
          )}
          
          {task.due_date && (
            <div className={`
              text-[11px] flex items-center gap-1 font-medium
              ${task.completed ? "text-gray-600" : "text-blue-400"}
            `}>
              <Calendar size={10} />
              <span>{formatDueDate(task.due_date)}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleImportant(task.id);
        }}
        className="shrink-0 p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        {task.important ? (
          <Star size={18} fill="#fbbf24" className="text-amber-400" />
        ) : (
          <Star 
            size={18} 
            className="text-gray-600 hover:text-amber-400 transition-colors" 
          />
        )}
      </button>
    </motion.div>
  );
}