import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import Application, { APPLICATION_STATUSES } from "../models/app.models";

const normalizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
};

const buildPayload = (body: Record<string, unknown>) => ({
  company: typeof body.company === "string" ? body.company.trim() : "",
  role: typeof body.role === "string" ? body.role.trim() : "",
  jdText: typeof body.jdText === "string" ? body.jdText : "",
  jdLink: typeof body.jdLink === "string" ? body.jdLink : "",
  notes: typeof body.notes === "string" ? body.notes : "",
  dateApplied: body.dateApplied ? new Date(String(body.dateApplied)) : new Date(),
  status: APPLICATION_STATUSES.includes(body.status as (typeof APPLICATION_STATUSES)[number])
    ? (body.status as (typeof APPLICATION_STATUSES)[number])
    : "Applied",
  salaryRange: typeof body.salaryRange === "string" ? body.salaryRange : "",
  location: typeof body.location === "string" ? body.location : "",
  seniority: typeof body.seniority === "string" ? body.seniority : "",
  requiredSkills: normalizeStringArray(body.requiredSkills),
  niceToHaveSkills: normalizeStringArray(body.niceToHaveSkills),
  suggestions: normalizeStringArray(body.suggestions).slice(0, 5),
});

export const createApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payload = buildPayload(req.body as Record<string, unknown>);

    if (!payload.company || !payload.role) {
      res.status(400).json({ message: "Company and role are required." });
      return;
    }

    const application = await Application.create({
      ...payload,
      userId: req.userId,
    });

    res.status(201).json({ application });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create application.";
    res.status(500).json({ message });
  }
};

export const getApplications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const applications = await Application.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch applications.";
    res.status(500).json({ message });
  }
};

export const getApplicationById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findOne({ _id: req.params.id, userId: req.userId });

    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }

    res.status(200).json({ application });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch application.";
    res.status(500).json({ message });
  }
};

export const updateApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payload = buildPayload(req.body as Record<string, unknown>);

    if (!payload.company || !payload.role) {
      res.status(400).json({ message: "Company and role are required." });
      return;
    }

    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      payload,
      { new: true, runValidators: true }
    );

    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }

    res.status(200).json({ application });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update application.";
    res.status(500).json({ message });
  }
};

export const deleteApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }

    res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete application.";
    res.status(500).json({ message });
  }
};
