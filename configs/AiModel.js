// // Import OpenAI SDK
// import { Configuration, OpenAIApi } from "openai";

// // Configure OpenAI API
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your environment variables
// });

// const openai = new OpenAIApi(configuration);

// const generationConfig = {
//   temperature: 1,
//   top_p: 0.95,
//   max_tokens: 8192,
// };

// export { openai, generationConfig };

// Comments for reference:
// /*
//  * Install the Generative AI SDK
//  * $ npm install @google/generative-ai
//  */
//
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyArEiEI4Bov3NizvhkK755SjKddvQ2jP4k";
const genAI = new GoogleGenerativeAI({ apiKey });

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
});
