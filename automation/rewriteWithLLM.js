import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const rewriteArticle = async (
  original,
  ref1,
  ref2,
  refLinks
) => {
  const prompt = `
Rewrite the article below so that it matches the structure,
SEO quality, formatting, and depth of the two reference articles.

Rules:
- Keep facts accurate
- Improve headings and readability
- Professional blog tone
- Do NOT copy sentences
- Add a References section at the bottom

Original Article:
${original}

Reference Article 1:
${ref1}

Reference Article 2:
${ref2}

References to cite:
${refLinks.join("\n")}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6
  });

  return response.choices[0].message.content;
};
