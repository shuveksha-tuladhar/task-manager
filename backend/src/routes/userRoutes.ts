import express, { Request, Response } from "express";
import User from "../models/userModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    console.log('Id:', req.params.id)
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password, createdAt } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,
      createdAt
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, email, password, createdAt } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, createdAt },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
});


export default router;
