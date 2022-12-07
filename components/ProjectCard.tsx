import React from 'react';
import Icon from './Icon';

const ProjectCard = (props: { title: string; icon: string; children: React.ReactNode }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 pb-4 md:pr-4 cursor-pointer">
      <div className="card rounded-lg bg-base-100 shadow-xl border-0 h-56 overflow-hidden pb-2 hover:bg-base-300">
        <div className="card-body">
          <Icon path={props.icon} />
          <h2 className="card-title">{props.title}</h2>
          <p className="text-gray-400">{props.children}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
