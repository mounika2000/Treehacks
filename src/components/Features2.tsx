import React from 'react';

import config from '../config/index.json';

const Features2 = () => {
  const { features2 } = config; // Make sure to have 'features2' in your config if it's different
  const { title, items: beliefsList } = features2;

  return (
    <div className="bg-background" id="beliefs">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {beliefsList.map((belief) => (
            <div
              key={belief.name}
              className="flex flex-col items-center text-center px-4"
            >
              <img className="mb-4" src={belief.icon} alt={belief.name} />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {belief.name}
              </h3>
              <p className="text-base text-gray-500 mt-2">
                {belief.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features2;
