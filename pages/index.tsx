import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import Icon from '../components/Icon';
const Page: NextPage = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <div className="flex-1 overflow-y-auto  p-8  bg-[#444654]">
        <div className="mx-auto max-w-6xl mt-12">
          <h1 className="text-xl font-semibold text-turquoise-700 border-b-2 border-turquoise-700 pb-2 w-fit ">
            Get Started
          </h1>

          {/* Project Cards */}
          <div className="flex flex-wrap mt-6">
            <div className="w-full md:w-1/2 lg:w-1/3 pb-4 md:pr-4 cursor-pointer">
              <div className="card rounded-lg  h-56 overflow-hidden pb-2 hover:bg-base-300 bg-base-100 e">
                <div className="card-body items-center text-center  mt-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <h2 className="font-bold card-title">Create New Project</h2>
                </div>
              </div>
            </div>

            <ProjectCard
              title={'SWOT Analysis'}
              icon={'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}>
              Jump into a whole SWOT analysis in 5 seconds — all we need is the name of the company.
            </ProjectCard>
            <ProjectCard
              title={'Business Overview'}
              icon={
                'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              }>
              Learn about the business with a detailed overview.
            </ProjectCard>
            <ProjectCard
              title={'Industry Report'}
              icon={'M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z'}>
              Get a detailed analysis of a certain industry, within seconds.
            </ProjectCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
