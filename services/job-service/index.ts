import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Job service running");
});

app.get("/jobs", async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Job service listening on port ${PORT}`);
});
