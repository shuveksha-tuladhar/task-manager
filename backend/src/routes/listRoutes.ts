import express, { Request, Response } from "express";
import List, { IList } from "../models/listModel";
import Task, { ITask } from "../models/taskModel";
import authGuard from "../middleware/authGuard";

const router = express.Router();

router.post("/", authGuard, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, userId } = req.body;

    const exists = await List.exists({ name, userId });
    if (exists) {
      res.status(400).json({ message: "Name already exists" });
      return;
    }

    const newList = new List({
      name,
      userId,
      canDelete: true,
      createdAt: new Date(),
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", authGuard, async (req: Request, res: Response): Promise<void> => {
  try {
    const lists: IList[] = await List.find();
    res.status(200).json(lists);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authGuard, async (req: Request, res: Response): Promise<void> => {
  try {
    const list: IList | null = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/tasks", authGuard, async (req: Request, res: Response): Promise<void> => {
  try {
    const list: IList | null = await List.findById(req.params.id);

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    const tasks: ITask[] = await Task.find({ listId: list._id });

    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", authGuard, async (req: Request, res: Response): Promise<void> => {
  try {
    const listId = req.params.id;
    const { name: newName, userId } = req.body;

    if (newName === undefined || userId === undefined) {
      res
        .status(400)
        .json({ message: "Name and userId is required for updating the list." });
      return;
    }
    const checkNameExists = await List.exists({ name: newName, userId });
    if (checkNameExists) {
      res.status(400).json({ message: "Name already exists" });
      return;
    }

    const updatedList: IList | null = await List.findByIdAndUpdate(
      listId,
      { name: newName },
      { new: true }
    );

    if (!updatedList) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    res.status(200).json(updatedList);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authGuard, async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedList: IList | null = await List.findByIdAndDelete(
      req.params.id
    );

    if (!deletedList) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    res.status(200).json({ message: "List deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
