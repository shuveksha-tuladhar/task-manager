import { create } from "zustand";
import { TaskType } from "../components/types/TaskType";

interface TaskStore {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  taskInput: string;
  setTaskInput: (title: string) => void;
  addTask: (task: TaskType) => void;
  removeTask: (id: string) => void;
  toggleFieldValue: (
    id: string,
    field: keyof Pick<TaskType, "completed" | "isStarred" | "isMyDay">
  ) => void;
  editingTaskId: string | null;
  editTask: (id: string, newTitle: string) => void;
  setEditingTask: (id: string | null) => void;
  activeTaskId: string | null;
  setActiveTaskId: (id: string | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  taskInput: "",
  setTaskInput: (title) => set({ taskInput: title }),

  addTask: (task) => {
    const { taskInput, tasks } = get();
    if (taskInput.trim()) {
      set({
        tasks: [...tasks, task],
        taskInput: "",
      });
    }
  },

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== id),
    })),

  toggleFieldValue: (id, field) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id && typeof task[field] === "boolean"
          ? { ...task, [field]: !task[field] }
          : task
      ),
    })),

  editingTaskId: null,
  editTask: (id, newTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, title: newTitle } : task
      ),
      editingTaskId: null,
    })),

  setEditingTask: (id) => set({ editingTaskId: id }),

  activeTaskId: null,
  setActiveTaskId: (id) => set({ activeTaskId: id }),
}));
