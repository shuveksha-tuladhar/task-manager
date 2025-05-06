import { create } from "zustand";
import { Step } from "../components/types/TaskType";
import { useTaskStore } from "./useTaskStore";

interface TaskStepStore {
  stepInput: string;
  setStepInput: (title: string) => void;
  editingStepId: string | null;
  setEditingStep: (id: string | null) => void;
  editStep: (taskId: string, stepId: string, newTitle: string) => void;
  updateSteps: (taskId: string, steps: Step[]) => void;
  removeStep: (taskId: string, stepId: string) => void;
  toggleStepComplete: (taskId: string, stepId: string) => void;
}

export const useTaskStepStore = create<TaskStepStore>((set) => ({
  stepInput: "",
  setStepInput: (title) => set({ stepInput: title }),
  editingStepId: null,
  setEditingStep: (id) => set({ editingStepId: id }),

  editStep: (taskId, stepId, newTitle) => {
    const { tasks, setTasks } = useTaskStore.getState();
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            steps: task.steps?.map((step) =>
              step._id === stepId ? { ...step, title: newTitle } : step
            ),
          }
        : task
    );
    setTasks(updatedTasks);
    set({ editingStepId: null });
  },

  updateSteps: (taskId, steps) => {
    const { tasks, setTasks } = useTaskStore.getState();
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            steps: steps ?? [],
          }
        : task
    );
    setTasks(updatedTasks);
    set({ stepInput: "" });
  },

  removeStep: (taskId, stepId) => {
    const { tasks, setTasks } = useTaskStore.getState();
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            steps: task.steps?.filter((step) => step._id !== stepId),
          }
        : task
    );
    setTasks(updatedTasks);
  },

  toggleStepComplete: (taskId, stepId) => {
    const { tasks, setTasks } = useTaskStore.getState();
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            steps: task.steps?.map((step) =>
              step._id === stepId
                ? { ...step, completed: !step.completed }
                : step
            ),
          }
        : task
    );
    setTasks(updatedTasks);
  },
}));
