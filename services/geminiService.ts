import { GoogleGenAI, Modality, Type } from "@google/genai";
import { TopicContent } from '../types';

const getGenAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define a strict schema for the text content to ensure reliable JSON parsing.
const topicContentSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The title of the driving maneuver." },
    description: { type: Type.STRING, description: "A brief overview of the maneuver." },
    steps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of clear, actionable steps for the maneuver."
    },
    observations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key observation points, ideally linked to the numbered positions in the diagram."
    },
    commonMistakes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of common mistakes learners make."
    },
    youtubeVideoUrl: { type: Type.STRING, description: "A valid URL to a relevant YouTube video." },
    youtubeVideoTitle: { type: Type.STRING, description: "The title of the YouTube video." }
  },
  required: ['title', 'description', 'steps', 'observations', 'commonMistakes', 'youtubeVideoUrl', 'youtubeVideoTitle']
};

/**
 * Generates a single base64 encoded image based on a prompt.
 * @param ai The GoogleGenAI instance.
 * @param prompt The prompt for image generation.
 * @returns A promise that resolves to a base64 string of the image.
 */
const generateImage = async (ai: GoogleGenAI, prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part && part.inlineData) {
        return part.inlineData.data;
    }
    throw new Error(`Failed to generate a valid image for prompt: "${prompt}"`);
};

export const fetchDrivingTopicDetails = async (topic: string): Promise<TopicContent> => {
  const ai = getGenAI();

  try {
    // Step 1: Fetch the structured text data using a more powerful model and a response schema for reliability.
    const textPrompt = `You are an expert driving instructor. Provide a comprehensive guide for the "${topic}" maneuver. Your response must be a JSON object matching the provided schema. The "observations" should be detailed, actionable, and reference numbered positions that would appear in a diagram. The YouTube video must be from a reputable source and publicly accessible.`;
    
    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro', // Use a more capable model for structured data.
      contents: textPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: topicContentSchema,
      },
    });

    const textContent = JSON.parse(textResponse.text);

    // Step 2: Generate the realistic photo based on the fetched title and description for better context.
    const photoPrompt = `Generate a realistic, high-quality photo of a car performing the "${textContent.title}" maneuver. The maneuver is described as: "${textContent.description}". The style should be like a clear, daytime photograph from a driver's education manual.`;
    const photo = await generateImage(ai, photoPrompt);

    // Step 3: Generate the diagram based on the fetched title and the detailed steps to ensure accuracy.
    const stepsForDiagram = textContent.steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
    const diagramPrompt = `Generate a simple, clear, top-down line-art diagram illustrating the steps for "${textContent.title}". The exact steps to illustrate are:\n${stepsForDiagram}\nThe diagram must show the car's positions and path, with key stages clearly numbered to correspond with these steps. Use minimal color, like a blueprint or instructional drawing. The diagram must accurately reflect the provided steps for ${textContent.title}.`;
    const diagram = await generateImage(ai, diagramPrompt);

    if (!photo || !diagram) {
        throw new Error("Failed to generate the required visual aids.");
    }

    return { ...textContent, photo, diagram } as TopicContent;

  } catch (error) {
    console.error(`Error fetching details for topic "${topic}":`, error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the AI's response. The format was invalid.");
    }
    throw new Error(`Could not fetch the guide for "${topic}". Please try again later.`);
  }
};