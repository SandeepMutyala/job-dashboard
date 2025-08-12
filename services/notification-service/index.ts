import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Notification service running");
});

app.get("/notifications", async (_req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Notification service listening on port ${PORT}`);
});
