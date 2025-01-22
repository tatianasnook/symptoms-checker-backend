import OpenAI from "openai";
import { config } from "dotenv";
import readline from "readline";

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter your symptoms: ", async (symptoms) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: `Based on your knowledge, can you give me a list of possible conditions based on these symptoms: ${symptoms}. I just need a list of possible conditions with descriptions and other symptoms.` }
            ]
        });

        console.log("\nPossible Conditions:\n", response.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        rl.close();
    }
});