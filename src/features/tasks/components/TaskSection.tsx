import { ChevronDown } from "lucide-react";
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
      <button onClick={onToggle} className="flex items-center gap-2 text-left group">
        <span>
          <ChevronDown size={28} />
        </span>
        <h2 className="text-2xl font-semibold">
          {title} {tasks.length > 0 && `(${tasks.length})`}
        </h2>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-3 overflow-hidden">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleCompleted={onToggleCompleted}
                  onToggleImportant={onToggleImportant}
                  onSelect={onSelectTask}
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm italic text-center py-4">
                {emptyMessage}
              </p>
            )}
        </div>
      )}
    </div>
  );
}
