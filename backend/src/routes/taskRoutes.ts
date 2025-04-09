import express, { Request, Response } from "express";
import Task, { ITask } from "../models/taskModel";
import authGuard from "../middleware/authGuard";

const router = express.Router();

router.post(
  "/",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, listId, assignedToUserId, priority, isStarred } = req.body;
      const userId = req.user?.userId;
      const assignedToUser = assignedToUserId || req.user?.userId;

      const assignedToUserSet = new Set([userId, assignedToUser]);

      const newTask = new Task({
        title,
        listId,
        userId,
        assignedTo: [...assignedToUserSet],
        priority: priority ?? "low",
        isStarred,
      });

      await newTask.save();
      res.status(201).json(newTask);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  "/",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks: ITask[] = await Task.find({
        $or: [{ userId: req.user?.userId }, { assignedTo: req.user?.userId }],
      });
      res.status(200).json(tasks);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  "/:id",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const task: ITask | null = await Task.findById(req.params.id);
      res.status(200).json(task);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.put(
  "/:id",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedTask: ITask | null = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/:id",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedTask: ITask | null = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete(
  "/:id",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedTask: ITask | null = await Task.findByIdAndDelete(
        req.params.id
      );

      if (!deletedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.status(200).json({ message: "Task deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/:id/complete",
  authGuard,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const task: ITask | null = await Task.findById(req.params.id);

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      task.completed = true;
      task.updatedAt = new Date();
      await task.save();

      res.status(200).json(task);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
