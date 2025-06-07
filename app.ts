import { serve } from "bun";
import { OpenAI } from "openai";
import { readFileSync } from "fs";
import { config } from "dotenv";

// Load environment variables
config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

// Read context file
const context = readFileSync("./context.md", "utf-8");

const server = serve({
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
    async fetch(req) {
        // Handle CORS
        if (req.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        if (req.method === "POST" && new URL(req.url).pathname === "/drone-instruction") {
            try {
                const { instruction } = await req.json();
                console.log("Otrzymano instrukcję:", instruction);

                // // Send to OpenAI
                // const prompt = `${context}\n\nOtrzymana instrukcja: ${instruction}\n\nProszę o opis miejsca gdzie znajduje się dron. Zwróć odpowiedź w formacie JSON z polami "thinking process" i "description".`;
                
                // const completion = await openai.chat.completions.create({
                //     model: "gpt-4o-mini",
                //     messages: [
                //         { role: "system", content: "Jesteś asystentem, który zwraca odpowiedź w formacie JSON z polami thinking process i description." },
                //         { role: "user", content: prompt }
                //     ],
                // });

                // const response = completion.choices[0].message.content?.trim() || "";
                // console.log("Odpowiedź od OpenAI:", response);

                // // Extract JSON from the response (remove markdown code block if present)
                // const jsonStr = response.replace(/```json\n|\n```/g, '');
                // const parsedResponse = JSON.parse(jsonStr);
                // const description = parsedResponse.description || "";
                var description = "test: " + process.env.TEST_KEY
                return new Response(JSON.stringify({ description }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                });
            } catch (error) {
                console.error("Błąd:", error);
                return new Response(JSON.stringify({ error: "Wystąpił błąd podczas przetwarzania" }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Listening on http://localhost:${server.port}`);
