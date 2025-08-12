import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("User service running");
});

app.get("/profiles", async (_req: Request, res: Response) => {
  try {
    const profiles = await prisma.user_profile.findMany();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`User service listening on port ${PORT}`);
});
