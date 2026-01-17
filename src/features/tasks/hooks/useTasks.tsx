import { useState, useEffect, useContext, useMemo } from "react";
import { HomeContext } from "../contexts/HomeContext";
import axiosPrivate from "../../../api/axiosPrivate";
import { getApiErrorMessage } from "../../shared/utils/getApiErrorMessage";
import type { Task } from "../types/TaskTypes";
import { getTodayISODate, normalizeDate } from "../utils/DateUtils";
import toast from "react-hot-toast";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTasks, setShowTasks] = useState({ todo: true, done: true });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { active } = useContext(HomeContext);

  useEffect(() => {
    async function getTasks() {
      setSelectedTask(null);
      try {
        const response = await axiosPrivate.get<Task[]>("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log(getApiErrorMessage(error));
      }
    }

    getTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    switch (active) {
      case "important":
        return tasks.filter((t) => t.important);

      case "scheduled":
        return tasks.filter((t) => !!t.due_date);

      case "my day":
        return tasks.filter((t) => {
          if (!t.due_date) return false;
          return normalizeDate(t.due_date) === getTodayISODate();
        });

      default:
        return tasks;
    }
  }, [tasks, active]);

  const todoTasks = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  async function toggleTaskCompleted(taskId: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    try {
      await axiosPrivate.patch(`/tasks/${taskId}/toggle-completed`);
    } catch {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    }
  }

  async function toggleTaskImportant(taskId: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, important: !task.important }
          : task
      )
    );

    try {
      await axiosPrivate.patch(`/tasks/${taskId}/toggle-important`);
    } catch {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, important: !task.important }
            : task
        )
      );
    }
  }

  async function handleAddTask() {
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axiosPrivate.post<Task>("/tasks", {
        title: newTaskTitle,
        important: active === "important",
        date: active === "my day" || active === "scheduled"
      });

      setTasks((prev) => [response.data, ...prev]);
      setNewTaskTitle("");
      toast.success("Task created!");
    } catch (error) {
      console.log(getApiErrorMessage(error));
      toast.error("Error creating task");
    }
  }

  async function updateTask(
    id: number,
    title: string,
    description: string,
    due_date: string | null
  ) {
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title, description, due_date } : t
      )
    );

    try {
      await axiosPrivate.patch(`/tasks/${id}`, {
        title,
        description,
        due_date,
      });
      toast.success("Task updated!");
    } catch (error) {
      setTasks(previousTasks);
      console.log(getApiErrorMessage(error));
      toast.error("Error updating task");
    }
  }

  async function deleteTask(id: number) {
    const previousTasks = tasks;

    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSelectedTask(null);

    try {
      await axiosPrivate.delete(`/tasks/${id}`);
      toast.success("Task removed!");
    } catch (error) {
      setTasks(previousTasks);
      console.log(getApiErrorMessage(error));
      toast.error("Error deleting task");
    }
  }

  return {
    tasks,
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
  };
}
