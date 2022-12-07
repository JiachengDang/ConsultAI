import { useRouter } from 'next/router';
import React from 'react';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { pid, tool } = router.query;

  return (
    <div className="text-4xl text-white">
      {pid}|{tool}
    </div>
  );
};

export default index;
