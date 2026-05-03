import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface NewsAnalysisResult {
  classification: "REAL" | "FAKE" | "UNVERIFIABLE";
  confidence: number;
  explanation: string;
  features: string[];
}

export async function analyzeNews(text: string): Promise<NewsAnalysisResult> {
  const prompt = `You are a Fake News Detection System utilizing NLP concepts. 
Analyze the following news headline or article to determine if it is likely real or fake news. 
Based on fact-checking principles, look for sensationalism, loaded language, lack of credible sources, or known misinformation narratives.

Respond strictly with a JSON object in the following format:
{
  "classification": "REAL" | "FAKE" | "UNVERIFIABLE",
  "confidence": <number between 0 and 100 representing confidence>,
  "explanation": "<A concise explanation of why it was classified this way. Mention the NLP/text features that led to this decision if applicable, e.g., 'high use of emotional words', 'lack of citations'>",
  "features": ["<list>", "<of>", "<text>", "<features>", "<detected>"]
}

News text to analyze:
${text}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as NewsAnalysisResult;
    }
    throw new Error("Empty response from AI model.");
  } catch (error) {
    console.error("Error analyzing news:", error);
    throw new Error("Failed to analyze the news article. Please try again.");
  }
}
