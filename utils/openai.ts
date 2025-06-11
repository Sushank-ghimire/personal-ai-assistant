import OpenAI from 'openai';

const AI_API_KEY = process.env.AI_API_KEY as string;

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: AI_API_KEY,
});

export default openai;
