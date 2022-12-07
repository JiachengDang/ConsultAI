import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv-safe';

dotenv.config();
export default async function getChatGPTResponse(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pid, prompt },
    method
  } = req;
  const api = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN as string });
  await api.ensureAuth();
  const response = await api.sendMessage(
    `Give me a thorough, professional and detailed SWOT analysis of ${prompt}.`
  );

  switch (method) {
    case 'GET':
      res.status(200).json({ res: response });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Path: pages\api\projects\[pid]\swot.ts
