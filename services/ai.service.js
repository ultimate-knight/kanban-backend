const OpenAI = require("openai");

    const client=new OpenAI({
        api_key:process.env.OPENAI_KEY
    })

    exports.parseJD = async (jd) => {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content: `Extract company, role, skills, seniority, location from:
        ${jd}`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
};