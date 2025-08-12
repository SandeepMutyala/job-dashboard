import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("AI service running");
});

app.get("/resume-analyses", async (_req: Request, res: Response) => {
  try {
    const analyses = await prisma.resume_analysis.findMany();
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analyses" });
  }
});

app.get("/job-matches", async (_req: Request, res: Response) => {
  try {
    const matches = await prisma.job_match.findMany();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job matches" });
  }
});

const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
  console.log(`AI service listening on port ${PORT}`);
});
