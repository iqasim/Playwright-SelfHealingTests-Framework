import { GoogleGenerativeAI } from "@google/generative-ai";

export class AISelfHealer {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "CRITICAL: GEMINI_API_KEY is not defined in your environment variables."
      );
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }
/* 
  async getHealedSelector(
    brokenSelector: string,
    domSnapshot: string
  ): Promise<string | null> {
    const prompt = `
    Task: Heal a broken Playwright locator.
    Broken Selector: "${brokenSelector}"
    Page Content: ${domSnapshot}
    
    Instructions: Find the element that matches the intent.
    CRITICAL: Return ONLY a valid CSS or XPath selector string. 
    DO NOT return Playwright code like "getByRole" or "page.locator".
    Example Output: "button#login" or "//input[@value='Log In']"
  `;

    const result = await this.model.generateContent(prompt);
    const rawText = result.response.text().trim();
    return rawText.replace(/^['"]|['"]$/g, "");
  }

 */
  async getHealedSelector(
    brokenSelector: string,
    domSnapshot: string
  ): Promise<string | null> {
    const prompt = `
    You are a test automation assistant. Your goal is to heal a broken Playwright selector.
    
    Broken Selector: "${brokenSelector}"
    Page Content: ${domSnapshot}
    
    STRICT RULES:
    1. Output ONLY the healed CSS or XPath string.
    2. Do NOT include explanations, "Healed Selector:", or markdown formatting.
    3. Ensure all XPath attributes use single quotes.
    

    Example Good Output: //input[@type='submit']
    Example Bad Output: Based on my analysis, the selector should be...
  `;

    const result = await this.model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // Defensive logic: If Gemini still returns markdown code blocks, strip them
    if (responseText.includes("```")) {
      responseText = responseText.replace(/```[a-z]*\n?|```/g, "").trim();
    }

    // If the response contains a newline, take only the last line (where AI usually puts the code)
    if (responseText.includes("\n")) {
      const lines = responseText.split("\n");
      responseText =
        lines.find((line: any) => line.includes("//") || line.includes("[")) ||
        lines[lines.length - 1];
    }

    return responseText.trim();
  }
}


