/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Markdown from 'react-markdown';

const tools: { [key: string]: { name: string; id: string } } = {
  swot: {
    name: 'SWOT Analysis',
    id: 'swot'
  },
  'business-overview': {
    name: 'Business Overview',
    id: 'business-overview'
  },
  'industry-report': {
    name: 'Industry Report',
    id: 'industry-report'
  }
};

const index = () => {
  const router = useRouter();
  const { pid, tool } = router.query;
  if (typeof pid !== 'string' || typeof tool !== 'string') return null;
  const [response, setResponse] = useState<string>('');
  const [name, setName] = useState<string>('Tesla');
  const [loading, setLoading] = useState<boolean>(false);

  const getChatGPT = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/demo/analysis?tool=${tool}&name=${name}`, {
        method: 'GET'
      });
      const data = await response.json();
      setResponse(data.res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="subpixel-antialiased tracking-wide leading-relaxed font-['Poppins']">
      <div className="text-4xl text-white ">{tools[tool].name}</div>
      <div className="divider"></div>
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
      <Markdown className="max-w-2xl mx-auto mt-10 whitespace-pre-wrap">{response}</Markdown>
      <div className="form-control w-full max-w-xs mx-auto mt-10 ">
        <label className="label items-center">
          <div className="label-text text-xl ">Company/Industry Name</div>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="Telsa"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={() => getChatGPT()} className=" mt-8 btn btn-block">
          {/* {loading && (
            <div
              className="radial-progress animate-spin mr-2"
              style={{ '--value': 70, '--size': '2rem', '--thickness': '0.25rem' }}
            />
          )} */}

          <span className="">{loading ? 'Loading...' : 'Generate'}</span>
        </button>
      </div>
    </div>
  );
};

export default index;
