import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Application service running");
});

app.get("/applications", async (_req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Application service listening on port ${PORT}`);
});
