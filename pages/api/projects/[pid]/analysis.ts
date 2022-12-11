import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv-safe';
import { type } from 'os';

dotenv.config();

// const SESSION_TOKEN =
//   'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bds-9bcgcFip_Q2-.Ygz3Q2pief5_xxT62S86t0vIcyWg0NLTkryrAsY-g19aWXkjjdYm1BnkSQV1ZkACj9Wn-5xZqfvM6G0p7qSm7WRx0RF6WJMeXsUExIcDPzpyHrlq6bO57frQaJjpRWVkI-DLzySoQKtkykR6xDagbvTJzrcVIohXo58h3kj27CmOWuW5d30KbWSQBuMxLLat8smFsw2_lK-WafI0TA4IrLtDLmZma2Vc4IEP4dmCAxza8wOE0Fn7U43PvOPJxSGA5n-cAqVf5BPtaMvajqP8r6GSXjk3Y34cRdwaAny9fmz-Ui8wvlyEc3EcL8PLGtfSd6em2BkQLB5-5Sti7Ge3a-cp05g--MvU7ZRSwUe2uHCIAppOpuhxt3zZyIlvSFyEqyabgb0NzqaN9ZmMEaoCVtJjTmvYferkE3r8QyJG28X6lxPU76HD8FkzNH28kK-MRWloQ4CwljOnoW9B863DDVTQ4mMQWghmcnmRnSWTjMQBsy6J4GGaLHCIrzUH4_T4MyMtx_HvZssciQC_vnUbQn8aOFNyvB-nfwY-qdgSFRJ3AGwx9Ysno48mrEa7mmxW6rwtXqmMaC7-YuYw9YAjjGIAVcNBon6ZilnVqZQU2ZNhfZyGfRw-w4JpX-YaAQ9zFjZEnAK5cP1DLYV49gvuuE6QzLp6kIJXJwJErSULLGdoad1INp4MHxI1AmHPfxCgs6b5SE54jnvcim7oKxbPFCIixcWAw_2b0wHBePXUJtlkprUxsni9uGXy0Qe5celtHGUm4qRRJM6htQUpmHp5mQ4TghNzslSrD0cTAcIiyq1FpDXS5g51I1KzWNL-NJOTHiLCbR5-71yHeW2kQ1x4zNfYbPnZ-sLn4roIFs84Tl8B0lKj2LU26B1NZiD7XGsYBusLiAsO7zdqzxJW6114mku1KBS81fPD0ztpYC4EZJQJBcqFl63pdOAczqIRmUgJE2n8z9TI9nA9grBxWuUGGtwjD4ZTP9REXgE77A2-cYMdsFYihAvJ8YS5kCHsLIL0dRJ1NWe_drvywA30qsLMmwdxmigM1nmKdS9uvVbeEUJDGJo8i7vFqnelCfdwHZHVBJcfQ6WdUMgX2VimHjkk4MOt9eTTUdlh0MYRQ5zK2zDqmZo-W5wsE9hKbkOjF8NArsJFuafgEI7ZihcsuT9fo-DF9KlPqL9zN6SbXEYmFopxGAEYvrcj-TbaOvvjI73bDHaRN_h91l-0eu6Aw7eYSUk4N5t4SC6RyTmi3Ygp2xGkwtPPPufoyij23rkgBTwn6oMsswb22IBA5Ne_JCvzLqahf7Zq-sLyY9kYGB5k7mgFCnymxB8iH-PbSoDsj_WfbRKymSJNH33D7U81ptMy7GMUJOZ3XMk1deQGepfien4cphHRV2Jrxn34ljC-VldILgZFdtVsV1YLE0ukcNIEnSnRU9Lfozykubx7l0ksD4pBfCEaS5D7NfBR8AY6MS-XB97vjgLDeWVGcRw2vLDA4Kq5_iayjN8p5jRerbaa0lWYexLwvkm0AGZWyfQzUVvO7ezCOj7N0pmAUcR7oJp7AP7p81RBm4ZzQzoA_fGuhiDHE3B-z9bfZuTAP1LsufJ0bVPXfYZfl_Fr1zun1MR4Y6YY7D66Kp6VfAvHHmEbBKbOZBWv8M67Olh2R5b9NtTFeU5y9IVDYTvG9rZJ8ePJf7XNDyWWKPH9wlYsT64XEUOXkahtpuOd8j5WHg89EY3aUQ0u0d82NnEkqStIdoQqb-zONNyx_OqnksyWsW_OAW4mhIhvnaXrOJbvBW9HlTzaHF63g9l8i3PNPArNM6xyUvKysWabjQqTxTdRUi1N_OyHMPCAgrps0ACHtMG4uDxBmDrBPa5Ux5RwO_IWex_oI_cp1DcoOQxBRB-UUsfhTab1Evy6_1fBLc5v4iYHPws8DC4t6O8rcs3DDkYgoYofc_kik_YtYoCFsnxRXtV7svEc6_w2KsJ775-qETsfO3sDIHMy7VgoCpnsBoGsGnaxLLauzIblcBw8_Z2BpdiZiHGRaQ1D8Q4DjeEHXG69XpJSbbXpSXHAo3KyB8eMGPpBGjaUS8cX64CmfMjq8uR4gwoP-1ckeqSC34bjPdTCkCW3xLwokKnAbTaBiDOW_75aGX-lohoRJ4NuKghhhMsnCzZUA2hjbzrNXQU3MFfEp8zr7AmvGxgYn_6NcT2xoAnCfLRVToGoemHBfgRjUM3pfx2dIe2PdJyBUXkSd-o__T8fdLalkcMMD2ekCYA.Lt5e1NhS04wquOG3BXtlfw';

/*
Market analysis: This component provides an in-depth analysis of the market in which the business operates, including its size, growth, trends, and competitors.

Financial analysis: This component provides a detailed analysis of the business's financial performance, including its revenue, profit, expenses, and cash flow.

Competitive analysis: This component compares the business to its competitors, highlighting its competitive advantages and disadvantages.

Customer analysis: This component provides insights into the business's customers, including their demographics, needs, preferences, and behavior.

Internal analysis: This component examines the business's internal environment, including its culture, processes, resources, and capabilities.

Strategic analysis: This component identifies the business's strategic priorities and recommends actions for the business to take in order to achieve its goals.
*/
const promptBuilder = (type: string, name: string) => {
  let prompt = '';
  switch (type) {
    case 'swot':
      //Introduction: This section provides an overview of the purpose and scope of the SWOT analysis, including the specific business or situation being analyzed.
      // SWOT matrix: This section presents the results of the SWOT analysis in a matrix format, highlighting the business's strengths, weaknesses, opportunities, and threats.
      // Implications and recommendations: This section provides an analysis of the implications of the SWOT results and recommends actions for the business to take based on the findings.
      // Conclusion: This section summarizes the key points of the SWOT analysis and highlights the business's key strengths and opportunities.
      prompt = `Here is a detailed and thorough outline for a SWOT analysis report
      Strengths: This section identifies the business's internal strengths, such as its competitive advantages, capabilities, and resources.
      Weaknesses: This section identifies the business's internal weaknesses, such as its limitations, vulnerabilities, and challenges.
      Opportunities: This section identifies external opportunities for the business, such as market trends, customer needs, and new technologies.
      Threats: This section identifies external threats to the business, such as competition, market conditions, and regulatory changes.
      Based on this outline, give me a through, professional and detailed SWOT analysis of ${name}.`;
      break;
    case 'business-overview':
      prompt = `Here is a detailed and thorough outline for a business overview report:
      Executive summary: This section provides a brief overview of the company, including its mission and vision, key products or services, target market, and competitive advantage. Company overview: This section provides a more in-depth look at the company, including its history, ownership structure, and organizational structure. |
      Products and services: This section describes the company's products or services in detail, including their features, benefits, and target market.
      Target market: This section defines the company's target market and explains the characteristics and needs of its customers.
      Revenue and profit: This section provides an overview of the company's financial performance, including its revenue and profit over the past few years and its projected growth.
      Key achievements: This section highlights the company's key achievements, such as awards, partnerships, and major milestones.
      Challenges and risks: This section identifies the company's key challenges and risks, such as competition, market conditions, and regulatory environment.
      Future plans: This section outlines the company's future plans and strategies, including its goals, objectives, and key initiatives.
      Conclusion: This section summarizes the key points of the business overview and highlights the company's strengths and opportunities.
      Based on this outline, give me a professional and detailed business overview of ${name}.`;
      break;
    case 'industry-report':
      prompt = `Here is a detailed and thorough outline for an industry report:
      Executive summary: This section provides a brief overview of the industry, including its market size, growth, trends, and key players.
      Industry definition and segmentation: This section defines the industry and provides a detailed breakdown of its different segments, based on product or service type, target market, or other relevant factors.
      Market size and growth: This section provides an overview of the industry's market size and growth, based on market data and industry research.
      Market trends and drivers: This section identifies the key trends and drivers affecting the industry, such as technological advancements, consumer preferences, and regulatory changes.
      Competitive landscape: This section provides an analysis of the industry's competitive landscape, including the market share and competitive positioning of the key players.
      Key players: This section profiles the industry's key players, including their business models, products or services, market share, and key strengths and weaknesses.
      SWOT analysis: This section performs a SWOT analysis of the industry, identifying its strengths, weaknesses, opportunities, and threats.
      Future outlook: This section provides an outlook for the industry, including its projected market size and growth, and key opportunities and challenges.
      Conclusion: This section summarizes the key points of the industry report and provides recommendations for industry stakeholders.
      Based on this outline, give me a professional and detailed industry report of ${name}.`;
      break;
    default:
      prompt = ``;
      break;
  }
  return prompt;
};
async function getChatGPT(prompt: string) {
  const api = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN as string }); //
  await api.ensureAuth();
  const response = await api.sendMessage(prompt);
  return response;
}

export default async function getChatGPTResponse(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pid, name, tool },
    method
  } = req;

  switch (method) {
    case 'GET':
      getChatGPT(promptBuilder(tool as string, name as string))
        .then((response) => {
          res.status(200).json({ res: response });
          console.log('Success!');
        })
        .catch((err) => {
          res.status(500).json({ res: err });
          console.log(err);
        });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Path: pages\api\projects\[pid]\swot.ts
