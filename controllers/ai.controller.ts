import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { parseJobDescription } from "../services/ai.service";

export const parseJobDescriptionController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { jd } = req.body as { jd?: string };

    if (!jd || !jd.trim()) {
      res.status(400).json({ message: "Job description is required." });
      return;
    }

    const data = await parseJobDescription(jd);
    res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI parsing failed.";
    res.status(500).json({ message });
  }
};
