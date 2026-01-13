import useTasks from "../hooks/useTasks";
import HomeContainer from "../components/HomeContainer";
import TaskSection from "../components/TaskSection";
import InputAddTask from "../components/InputAddTask";
import TaskDetailsPanel from "../components/TaskDetailsPainel";

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
              emptyMessage="Não há tarefas"
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
              emptyMessage="Nenhuma tarefa concluída"
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
