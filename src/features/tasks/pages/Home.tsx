import useTasks from "../hooks/useTasks";
import HomeContainer from "../components/HomeContainer";
import TaskSection from "../components/TaskSection";
import InputAddTask from "../components/InputAddTask";
import TaskDetailsPanel from "../components/TaskDetailsPainel";
import { emptyMessages } from "../utils/EmptyMessages";
import { HomeContext } from "../contexts/HomeContext";
import { useContext } from "react";

export default function Home() {
  const {
    showTasks,
    setShowTasks,
    newTaskTitle,
    setNewTaskTitle,
    selectedTask,
    setSelectedTask,
    todoTasks,
    completedTasks,
    toggleTaskCompleted,
    toggleTaskImportant,
    handleAddTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const { active } = useContext(HomeContext);
  const emptyTodoMessage = emptyMessages[active].todo;
  const emptyDoneMessage = emptyMessages[active].done;

  return (
    <HomeContainer>
      <div className="flex h-[90%] gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            <TaskSection
              title="To Do"
              tasks={todoTasks}
              isOpen={showTasks.todo}
              onToggle={() =>
                setShowTasks((prev) => ({ ...prev, todo: !prev.todo }))
              }
              emptyMessage={emptyTodoMessage}
              onToggleCompleted={toggleTaskCompleted}
              onToggleImportant={toggleTaskImportant}
              onSelectTask={setSelectedTask}
            />

            <TaskSection
              title="Done"
              tasks={completedTasks}
              isOpen={showTasks.done}
              onToggle={() =>
                setShowTasks((prev) => ({ ...prev, done: !prev.done }))
              }
              emptyMessage={emptyDoneMessage}
              onToggleCompleted={toggleTaskCompleted}
              onToggleImportant={toggleTaskImportant}
              onSelectTask={setSelectedTask}
            />
          </div>

          <InputAddTask
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            handleAddTask={handleAddTask}
          />
        </div>

        {selectedTask && (
          <TaskDetailsPanel
            key={selectedTask.id}
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
      </div>
    </HomeContainer>
  );
}
