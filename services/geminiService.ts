import { GoogleGenAI, Type } from "@google/genai";
import type { RouteOption, AqiData } from '../types';

// API key is hardcoded for local development as requested.
const apiKey = "AIzaSyBLz2r2jNycsEFallitqRgIxxdlzqRnt0c";
const ai = new GoogleGenAI({ apiKey });

const detailedTravelModeEnum = ['walk', 'cycle', 'bus', 'car', 'metro', 'rapid_metro', 'local_auto'];

const routeSegmentSchema = {
    type: Type.OBJECT,
    properties: {
        mode: { type: Type.STRING, enum: detailedTravelModeEnum, description: "The specific mode for this segment of the journey." },
        duration: { type: Type.INTEGER, description: "Segment duration in minutes." },
        distance: { type: Type.NUMBER, description: "Segment distance in kilometers." },
        description: { type: Type.STRING, description: "A brief description of this segment, e.g., 'Walk to Central Secretariat Metro Station'." }
    },
    required: ["mode", "duration", "distance", "description"]
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        routes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A user-friendly title for the route, e.g., 'Public Transport' or 'Walk + Metro'." },
                    travelMode: { type: Type.STRING, enum: ['walk', 'cycle', 'bus', 'car'], description: "The primary mode of travel. 'bus' represents all forms of public transport or mixed-mode public transport." },
                    duration: { type: Type.INTEGER, description: "Total estimated duration in minutes." },
                    distance: { type: Type.NUMBER, description: "Total distance in kilometers." },
                    co2Emissions: { type: Type.INTEGER, description: "Total estimated CO2 emissions in grams." },
                    ecoScore: { type: Type.INTEGER, description: "A score from 1 (worst) to 100 (best) based on sustainability." },
                    segments: {
                        type: Type.ARRAY,
                        items: routeSegmentSchema,
                        description: "A detailed breakdown of the journey into individual segments."
                    }
                },
                required: ["title", "travelMode", "duration", "distance", "co2Emissions", "ecoScore", "segments"]
            }
        },
        aqi: {
            type: Type.OBJECT,
            properties: {
                value: { type: Type.INTEGER, description: "Air Quality Index value (0-500)." },
                description: { type: Type.STRING, description: "A brief, one-sentence summary of the air quality." },
            },
            required: ["value", "description"]
        }
    },
    required: ["routes", "aqi"]
};


interface GeminiResponse {
    routes: RouteOption[];
    aqi: AqiData;
}

export const getEcoRoutes = async (source: string, destination: string): Promise<GeminiResponse | null> => {
  try {
    const prompt = `You are an eco-friendly travel route planner API specialized for locations within India. Your task is to provide PRACTICAL and sustainable travel options.
For the journey from "${source}" to "${destination}", generate up to 5 distinct, feasible, and eco-friendly travel options.

**CRITICAL INSTRUCTIONS:**
-   Analyze the total distance. DO NOT suggest 'walk' as a primary route if the distance is over 5 km.
-   DO NOT suggest 'cycle' as a primary route if the distance is over 20 km.
-   For long-distance travel between cities (e.g., over 50km), focus only on 'car' and realistic public transport combinations. Do not suggest walking or cycling.
-   Your primary goal is to provide useful, realistic suggestions that a person would actually consider.

Based on these rules, include the following route types IF they are practical for the given distance:
1.  A pure 'walk' route (only for short distances, <5km).
2.  A pure 'cycle' route (only for medium distances, <20km).
3.  A 'car' route.
4.  At least two different and common public transport combinations (e.g., 'Walk + Metro', 'Bus + Auto'). These are often the best options for intra-city travel.

For each route option, you must provide:
1.  A descriptive 'title' for the route (e.g., "Walking Only", "Cycling", "Public Transport (Metro + Walk)", "Driving").
2.  A 'travelMode' from the allowed enum ('walk', 'cycle', 'bus', 'car'). For all public transport or mixed-mode routes, set 'travelMode' to 'bus'. This is used for icon mapping.
3.  A detailed breakdown in 'segments'. For 'walk', 'cycle', and 'car', this will be a single segment. For public transport options, it MUST be a multi-step journey.
4.  The total 'duration', 'distance', 'co2Emissions', and an overall 'ecoScore'.
5.  The sum of durations and distances from all segments should roughly equal the total for the route.
6.  CO2 emissions for walking and cycling segments should be 0.

Additionally, provide a simulated Air Quality Index (AQI) for the general area.

Respond ONLY with a valid JSON object that strictly adheres to the provided schema. Do not include any other text, explanations, or markdown formatting.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

    const jsonString = response.text.trim();
    const parsedData: GeminiResponse = JSON.parse(jsonString);
    
    // Sort routes by eco-friendliness
    parsedData.routes.sort((a, b) => b.ecoScore - a.ecoScore);

    return parsedData;

  } catch (error) {
    console.error("Error fetching eco routes from Gemini:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("Failed to parse the route data. The format from the AI may be incorrect.");
    }
    throw new Error("An unexpected error occurred while fetching route data.");
  }
};

export const getLocationSuggestions = async (query: string): Promise<string[]> => {
    if (!query) {
        return [];
    }
    try {
        const prompt = `You are a location suggestion API for an Indian travel app.
        Based on the user's query "${query}", provide a list of up to 5 relevant and specific location suggestions in India.
        Examples:
        - Query: "rajiv" -> Response: ["Rajiv Chowk, New Delhi, India", "Rajiv Gandhi International Airport, Hyderabad, India"]
        - Query: "mumbai air" -> Response: ["Chhatrapati Shivaji Maharaj International Airport, Mumbai, India"]
        
        Respond ONLY with a valid JSON array of strings. Do not include any other text, explanations, or markdown formatting.
        The response should be a simple array like: ["suggestion1", "suggestion2"]`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                    },
                },
                // Use a very low thinking budget for fast autocomplete
                thinkingConfig: { thinkingBudget: 0 } 
            },
        });

        const jsonString = response.text.trim();
        const suggestions: string[] = JSON.parse(jsonString);
        return suggestions;

    } catch (error) {
        console.error("Error fetching location suggestions from Gemini:", error);
        // Return an empty array on error to prevent UI crash
        return [];
    }
};