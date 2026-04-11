import mongoose, { Types } from "mongoose";

export const APPLICATION_STATUSES = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface IApplication {
  userId: Types.ObjectId;
  company: string;
  role: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  dateApplied: Date;
  status: ApplicationStatus;
  salaryRange?: string;
  location?: string;
  seniority?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  suggestions: string[];
}

const applicationSchema = new mongoose.Schema<IApplication>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    jdText: {
      type: String,
      default: "",
    },
    jdLink: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    dateApplied: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "Applied",
    },
    salaryRange: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    seniority: {
      type: String,
      default: "",
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Application = mongoose.model<IApplication>("Application", applicationSchema);

export default Application;
