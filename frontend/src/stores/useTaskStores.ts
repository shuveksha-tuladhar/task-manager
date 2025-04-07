import { create } from "zustand";
import { TaskType } from "../components/types/TaskType";
interface TaskStore {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  taskInput: string;
  setTaskInput: (title: string) => void;
  addTask: (task: TaskType) => void;
  removeTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  toggleImportant: (id: string) => void;
  editingTaskId: string | null;
  editTask: (id: string, newTitle: string) => void;
  setEditingTask: (id: string | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks: TaskType[]) => set({ tasks }),
  taskInput: "",
  setTaskInput: (title) => set({ taskInput: title }),

  addTask: (task: TaskType) => {
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

  toggleComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

    toggleImportant: (id) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? { ...task, isStarred: !task.isStarred } : task
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
}));
