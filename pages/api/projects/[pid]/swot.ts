import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv-safe';

dotenv.config();

async function getChatGPT(prompt: string) {
  const api = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN as string });
  await api.ensureAuth();
  const response = await api.sendMessage(
    `Give me a thorough, professional and detailed SWOT analysis of ${prompt}.`
  );
  return response;
}

export default async function getChatGPTResponse(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pid, prompt },
    method
  } = req;

  switch (method) {
    case 'GET':
      getChatGPT(prompt as string)
        .then((response) => {
          res.status(200).json({ res: response });
          console.log('Success!');
        })
        .catch((err) => {
          res.status(500).json({ res: err });
        });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Path: pages\api\projects\[pid]\swot.ts
