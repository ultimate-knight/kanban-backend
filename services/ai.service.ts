import Groq from 'groq-sdk';

console.log("🔑 GROK_API_KEY loaded:", process.env.GROK_API_KEY ? "✓ (exists)" : "✗ (missing)");

let client: Groq | null = null;

const getClient = (): Groq => {
  if (!client) {
    if (!process.env.GROK_API_KEY) {
      throw new Error("GROK_API_KEY environment variable is not set.");
    }
    client = new Groq({ apiKey: process.env.GROK_API_KEY });
  }
  return client;
};

export const parseJD = async (jd: string): Promise<any> => {
  try {
    console.log("📝 Parsing JD with Llama 3.3 70B on Groq...");

    const groqClient = getClient();

    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert HR and career coach. Always respond with valid JSON only. Never add explanations or markdown."
        },
        {
          role: "user",
          content: `Analyze the following Job Description and return ONLY a valid JSON object.

Job Description:
${jd}

Return the response in this exact JSON format:

{
  "company": "Company name or null if not mentioned",
  "role": "Exact job title",
  "skills": ["skill1", "skill2", "skill3"],
  "seniority": "Junior | Mid-level | Senior | Lead | Executive",
  "location": "City name or 'Remote' or 'Hybrid'",
  "suggestions": [
    "First strong resume bullet point",
    "Second strong resume bullet point",
    "Third strong resume bullet point",
    "Fourth strong resume bullet point",
    "Fifth strong resume bullet point"
  ]
}

Rules for "suggestions":
- Generate 5 powerful, achievement-oriented bullet points suitable for this role.
- Start each bullet with strong action verbs (Developed, Built, Implemented, Optimized, Led, etc.).
- Make them sound professional and impactful.
- Do not mention the company name in the suggestions.
- Focus on skills and responsibilities mentioned in the JD.`
        }
      ],
      temperature: 0.2,
      max_tokens: 900
    });

    console.log("✓ Groq Response received");

    let content = response.choices[0].message.content?.trim() || '';

    // Clean markdown code blocks if any
    content = content.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("JSON parsing failed. Raw output:", content);
      parsed = {
        company: null,
        role: "Unknown",
        skills: [],
        seniority: "Unknown",
        location: "Unknown",
        suggestions: []
      };
    }

    return parsed;

  } catch (error: any) {
    console.error("❌ Error Details:", error.message);
    console.error("Status Code:", error.status);

    if (error.status === 429) {
      console.error("Rate limit hit on Groq. Wait 30-60 seconds and try again.");
    } else if (error.status === 401) {
      console.error("Invalid Groq API key! Use key from https://console.groq.com");
    }

    throw error;
  }
};
