import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from './routes/userRoutes'
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import listRoutes from "./routes/listRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json("Server is running!");
});

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
