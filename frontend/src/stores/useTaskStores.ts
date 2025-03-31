import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}
interface TaskStore {
  tasks: Task[];
  activeCategory: string;
  editingTaskId: number | null;
  setActiveCategory: (category: string) => void;
  addTask: (title: string, category: string) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  setEditingTask: (id: number | null) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: 1, title: "Buy books", category: "My Day", completed: false },
    { id: 2, title: "Meeting at 2PM", category: "Planned", completed: false },
  ],
  
  activeCategory: "My Day",
  editingTaskId: null,

  setActiveCategory: (category) => set({ activeCategory: category }),

  addTask: (title, category) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title, category, completed: false }],
    })),

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
      editingTaskId: null
    })),

  setEditingTask: (id) => set({ editingTaskId: id }),
}));
