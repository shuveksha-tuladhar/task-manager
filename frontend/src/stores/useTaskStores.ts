import { create } from "zustand";
import { Task } from "./types/TaskType";
interface TaskStore {
  tasks: Task[];
  activeCategory: string;
  taskInput: string;
  editingTaskId: number | null;
  setActiveCategory: (category: string) => void;
  setTaskInput: (title: string) => void;
  addTask: () => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  setEditingTask: (id: number | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [
    { id: 1, title: "Buy books", category: "My Day", completed: false },
    { id: 2, title: "Meeting at 2PM", category: "Planned", completed: false },
  ],
  
  activeCategory: "My Day",
  taskInput: "",
  editingTaskId: null,

  setActiveCategory: (category) => set({ activeCategory: category }),

  setTaskInput: (title) => set({ taskInput: title }),

  addTask: () => {
    const { taskInput, activeCategory, tasks } = get();
    if (taskInput.trim()) {
      set({
        tasks: [...tasks, { id: Date.now(), title: taskInput, category: activeCategory, completed: false }],
        taskInput: "", 
      });
    }
  },

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  editTask: (id, newTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      ),
      editingTaskId: null,
    })),

  setEditingTask: (id) => set({ editingTaskId: id }),
}));
