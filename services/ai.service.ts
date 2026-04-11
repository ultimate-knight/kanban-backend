import Groq from "groq-sdk";

export interface ParsedJobDescription {
  company: string;
  role: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority: string;
  location: string;
  suggestions: string[];
}

let client: Groq | null = null;

const getClient = (): Groq => {
  if (!client) {
    if (!process.env.GROK_KEY) {
      throw new Error("GROK_KEY is not configured.");
    }

    client = new Groq({
      apiKey: process.env.GROK_KEY,
    });
  }

  return client;
};

const fallbackParsedResponse = (): ParsedJobDescription => ({
  company: "",
  role: "",
  requiredSkills: [],
  niceToHaveSkills: [],
  seniority: "",
  location: "",
  suggestions: [],
});

const normalizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10);
};

const safeJsonParse = (content: string): Record<string, unknown> => {
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as Record<string, unknown>;
    }
    throw new Error("AI returned invalid JSON.");
  }
};

export const parseJobDescription = async (
  jd: string
): Promise<ParsedJobDescription> => {
  const cleanJd = jd.trim();

  if (!cleanJd) {
    throw new Error("Job description is required.");
  }

  const groq = getClient();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You extract structured hiring data from job descriptions. Return ONLY valid JSON. Do not include markdown, explanations, or extra text. Suggestions must be specific to the role, achievement-oriented, and resume-ready.",
      },
      {
        role: "user",
        content: `Analyze this job description and extract the following fields:

- company
- role
- requiredSkills (array of strings)
- niceToHaveSkills (array of strings)
- seniority
- location
- suggestions (array of 3 to 5 tailored resume bullet points)

Rules:
- Return ONLY valid JSON
- Do not wrap in markdown
- Do not add any extra text
- Suggestions must be specific to the role and responsibilities
- Avoid generic advice
- If a field is missing, return an empty string or empty array

Use exactly this JSON shape:

{
  "company": "",
  "role": "",
  "requiredSkills": [],
  "niceToHaveSkills": [],
  "seniority": "",
  "location": "",
  "suggestions": []
}

Job description:
${cleanJd}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response.");
  }

  const parsed = safeJsonParse(content);

  const result: ParsedJobDescription = {
    ...fallbackParsedResponse(),
    company: typeof parsed.company === "string" ? parsed.company.trim() : "",
    role: typeof parsed.role === "string" ? parsed.role.trim() : "",
    requiredSkills: normalizeStringArray(parsed.requiredSkills),
    niceToHaveSkills: normalizeStringArray(parsed.niceToHaveSkills),
    seniority: typeof parsed.seniority === "string" ? parsed.seniority.trim() : "",
    location: typeof parsed.location === "string" ? parsed.location.trim() : "",
    suggestions: normalizeStringArray(parsed.suggestions).slice(0, 5),
  };

  if (!result.role) {
    throw new Error("AI response was missing the role.");
  }

  if (result.suggestions.length < 3) {
    throw new Error("AI response did not contain enough suggestions.");
  }

  return result;
};