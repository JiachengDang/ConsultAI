import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Icon from '../components/Icon';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-row h-screen">
      {/* Nav Bar */}
      <div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-purple-400 text-center  text-3xl  m-6 md:text-3xl xl:text-4xl  font-bold whitespace-pre-line leading-normal subpixel-antialiased">
          Consult.AI
        </div>
        <ul className="  menu menu-compact lg:menu-normal   w-60 p-2 ">
          <li>
            <Link href="/">
              <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              <div className="">Projects</div>
            </Link>
          </li>
          <li>
            <Link href="/projects/DEMO?tool=swot">
              <Icon path="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <div className=" ">SWOT Analysis</div>
            </Link>
          </li>
          <li>
            <Link href="/projects/DEMO?tool=business-overview">
              <Icon path="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              <div className=" ">Business Overview</div>
            </Link>
          </li>
          <li>
            <Link href="/projects/DEMO?tool=industry-report">
              <Icon path="M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z" />
              <div className=" ">Industry Report</div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-row h-screen w-full">
        <div className="flex-1 overflow-y-auto  p-8  bg-[#444654]">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
