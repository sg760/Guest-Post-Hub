
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * Finds clients in a specific niche using Google Search grounding
   */
  async findClients(niche: string, region: string) {
    const prompt = `Find 10 real companies or businesses in the ${niche} niche based in ${region} that might need SEO/Backlink services. 
    Return a JSON array of objects with keys: name, website, niche, description, and estimatedTrafficCategory (Low, Medium, High).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              website: { type: Type.STRING },
              niche: { type: Type.STRING },
              description: { type: Type.STRING },
              estimatedTrafficCategory: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  },

  /**
   * Discovers guest posting opportunities
   */
  async discoverSites(niche: string) {
    const prompt = `Find 10 websites in the ${niche} niche that have a "Write For Us" page or accept guest posts. 
    Return a JSON array of objects with keys: url, title, domainAuthorityEstimate (1-100), and contactPage.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              url: { type: Type.STRING },
              title: { type: Type.STRING },
              domainAuthorityEstimate: { type: Type.NUMBER },
              contactPage: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  },

  /**
   * Generates outreach emails
   */
  async generateOutreach(type: 'first' | 'followup' | 'negotiation', details: any) {
    const prompt = `Generate a highly professional and high-converting ${type} guest blogging outreach email.
    Context:
    - Client Name: ${details.clientName}
    - Targeted Site: ${details.siteUrl}
    - Topic: ${details.topic}
    - Goal: Secure a backlink for ${details.targetUrl} with anchor text "${details.anchorText}".
    
    Make it natural, non-spammy, and concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  },

  /**
   * Generates full guest post content
   */
  async generateGuestPost(topic: string, targetUrl: string, anchorText: string) {
    const prompt = `Write a high-quality, SEO-optimized guest post article (at least 600 words) about: ${topic}.
    - Include exactly one natural backlink to ${targetUrl} using the anchor text "${anchorText}".
    - Use H1, H2 tags.
    - Professional, engaging, and informative tone.
    - Avoid generic AI patterns.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  }
};
