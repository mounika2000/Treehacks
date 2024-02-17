import React from 'react';

import config from '../config/index.json';

const Features1 = () => {
  const { features } = config;
  const { title, subtitle, description, items: featuresList } = features;
  return (
    <div className={`py-12 bg-background`} id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
            {title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {featuresList.slice(0, 3).map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center p-4 text-center"
            >
              <img
                className="h-18 w-18 mb-4"
                src={feature.icon}
                alt={feature.name}
              />
              <p className="text-lg leading-6 font-medium text-gray-900">
                {feature.name}
              </p>
              <p className="text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 justify-items-center">
          {featuresList.slice(3).map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center p-4 text-center"
            >
              <img
                className="h-18 w-18 mb-4"
                src={feature.icon}
                alt={feature.name}
              />
              <p className="text-lg leading-6 font-medium text-gray-900">
                {feature.name}
              </p>
              <p className="text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features1;
