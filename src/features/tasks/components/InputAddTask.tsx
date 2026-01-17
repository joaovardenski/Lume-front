import { Plus, Send } from "lucide-react";

interface InputAddTaskProps {
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  handleAddTask: () => void;
}

export default function InputAddTask({
  newTaskTitle,
  setNewTaskTitle,
  handleAddTask,
}: InputAddTaskProps) {
  return (
    <div className="relative mt-2">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
        placeholder="New task"
        className="w-full bg-gray-700 px-10 py-3 rounded-xl outline-0 hover:bg-gray-600 transition"
      />

      <button
        onClick={handleAddTask}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <Plus size={20} className="text-gray-400" />
      </button>

      <button
        onClick={handleAddTask}
        className={`absolute right-3 top-1/2 -translate-y-1/2 md:hidden transition ${!newTaskTitle.trim() && "opacity-0 pointer-events-none"}`}
      >
        <Send size={20} className="text-gray-400" />
      </button>
    </div>
  );
}
