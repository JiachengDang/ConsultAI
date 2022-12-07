import { NextApiRequest, NextApiResponse } from 'next';

export default function getChatGPTResponse(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pid, prompt },
    method
  } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ name: `Project ${pid}:${prompt}` });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
