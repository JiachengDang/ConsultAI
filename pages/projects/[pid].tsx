/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const tools: { [key: string]: { name: string; id: string } } = {
  swot: {
    name: 'SWOT Analysis',
    id: 'swot'
  },
  businessOverview: {
    name: 'Business Overview',
    id: 'business-overview'
  },
  industryReport: {
    name: 'Industry Report',
    id: 'industry-report'
  }
};

const index = () => {
  const router = useRouter();
  const { pid, tool } = router.query;
  if (typeof pid !== 'string' || typeof tool !== 'string') return null;
  const [response, setResponse] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('Tesla');

  const getChatGPT = async () => {
    try {
      const response = await fetch(`/api/projects/demo/${tool}?prompt=${prompt}`, {
        method: 'GET'
      });
      const data = await response.json();
      setResponse(data.res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-4xl text-white ">{tools[tool].name}</div>
      <div className="divider"></div>
      <div className="text-xl text-white mt-4">{response}</div>

      <div className="form-control w-full max-w-xs mx-auto mt-20 ">
        <label className="label items-center">
          <div className="label-text text-2xl ">Company/Industry Name</div>
        </label>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          id="prompt"
          placeholder="Telsa"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={() => getChatGPT()} className=" mt-8 btn btn-block">
          Generate
        </button>
      </div>
    </>
  );
};

export default index;
