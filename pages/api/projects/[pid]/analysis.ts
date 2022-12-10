import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv-safe';

dotenv.config();

/*
Market analysis: This component provides an in-depth analysis of the market in which the business operates, including its size, growth, trends, and competitors.

Financial analysis: This component provides a detailed analysis of the business's financial performance, including its revenue, profit, expenses, and cash flow.

Competitive analysis: This component compares the business to its competitors, highlighting its competitive advantages and disadvantages.

Customer analysis: This component provides insights into the business's customers, including their demographics, needs, preferences, and behavior.

Internal analysis: This component examines the business's internal environment, including its culture, processes, resources, and capabilities.

Strategic analysis: This component identifies the business's strategic priorities and recommends actions for the business to take in order to achieve its goals.
*/
const prompts = {
  swot: `Here is a detailed and thorough outline for a SWOT analysis report
  Introduction: This section provides an overview of the purpose and scope of the SWOT analysis, including the specific business or situation being analyzed.
  Strengths: This section identifies the business's internal strengths, such as its competitive advantages, capabilities, and resources.
  Weaknesses: This section identifies the business's internal weaknesses, such as its limitations, vulnerabilities, and challenges.
  Opportunities: This section identifies external opportunities for the business, such as market trends, customer needs, and new technologies.
  Threats: This section identifies external threats to the business, such as competition, market conditions, and regulatory changes.
  SWOT matrix: This section presents the results of the SWOT analysis in a matrix format, highlighting the business's strengths, weaknesses, opportunities, and threats.
  Implications and recommendations: This section provides an analysis of the implications of the SWOT results and recommends actions for the business to take based on the findings.
  Conclusion: This section summarizes the key points of the SWOT analysis and highlights the business's key strengths and opportunities.`,

  'business-overview': `Here is a detailed and thorough outline for a business overview report:
  Executive summary: This section provides a brief overview of the company, including its mission and vision, key products or services, target market, and competitive advantage. Company overview: This section provides a more in-depth look at the company, including its history, ownership structure, and organizational structure. |
  Products and services: This section describes the company's products or services in detail, including their features, benefits, and target market.
  Target market: This section defines the company's target market and explains the characteristics and needs of its customers.
  Revenue and profit: This section provides an overview of the company's financial performance, including its revenue and profit over the past few years and its projected growth.
  Key achievements: This section highlights the company's key achievements, such as awards, partnerships, and major milestones.
  Challenges and risks: This section identifies the company's key challenges and risks, such as competition, market conditions, and regulatory environment.
  Future plans: This section outlines the company's future plans and strategies, including its goals, objectives, and key initiatives.
  Conclusion: This section summarizes the key points of the business overview and highlights the company's strengths and opportunities.`,

  'industry-report': `Here is a detailed and thorough outline for an industry report:
  Executive summary: This section provides a brief overview of the industry, including its market size, growth, trends, and key players.
  Industry definition and segmentation: This section defines the industry and provides a detailed breakdown of its different segments, based on product or service type, target market, or other relevant factors.
  Market size and growth: This section provides an overview of the industry's market size and growth, based on market data and industry research.
  Market trends and drivers: This section identifies the key trends and drivers affecting the industry, such as technological advancements, consumer preferences, and regulatory changes.
  Competitive landscape: This section provides an analysis of the industry's competitive landscape, including the market share and competitive positioning of the key players.
  Key players: This section profiles the industry's key players, including their business models, products or services, market share, and key strengths and weaknesses.
  SWOT analysis: This section performs a SWOT analysis of the industry, identifying its strengths, weaknesses, opportunities, and threats.
  Future outlook: This section provides an outlook for the industry, including its projected market size and growth, and key opportunities and challenges.
  Conclusion: This section summarizes the key points of the industry report and provides recommendations for industry stakeholders.`
};
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
