import OpenAI from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const checkSymptoms = async (req, res) => {
    const { symptoms } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "user", 
                    content: `Based on your knowledge, can you give me a list of possible conditions based on these symptoms: ${symptoms}. I just need a list of possible conditions with descriptions and other symptoms.` 
                }
            ]
        });

        res.json({ conditions: response.choices[0].message.content });
    } catch (error) {
        console.error("Error processing symptoms:", error);
        res.status(500).json({ error: "Error processing symptoms" });
    }
};

export const getConditionInfo = async (req, res) => {
    const { condition } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "user", 
                    content: `Can you provide detailed information about the condition: ${condition}? Include causes, symptoms, treatments, and prevention methods.` 
                }
            ]
        });

        res.json({ details: response.choices[0].message.content });
    } catch (error) {
        console.error("Error fetching condition details:", error);
        res.status(500).json({ error: "Error fetching condition details" });
    }
};
