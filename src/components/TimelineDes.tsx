import React from 'react';

// import { usePetType } from './path-to/PetTypeContext';
import config from '../config/index.json';

const TimelineDes = () => {
  // const { petType, setPetType } = usePetType();

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPetType(event.target.value);
  // };

  const { timeline } = config;
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-10xl  font-extrabold sm:text-6xl md:text-8xl max-w-none whitespace-nowrap">
          <span className="block xl:inline">{timeline.title}</span>
          <span className="block text-primary">{timeline.subtitle}</span>
        </h1>
        <div className="relative lg:flex lg:items-center">
          {/* Other content on the left side */}
          <div className="flex justify-between items-center w:80%">
            <img
              className="w-2/3 h-2/3 object-cover"
              src={timeline.img1} // Replace with your actual image path
              alt="Image description"
            />
            <img
              className="w-2/3 h-2/3 object-cover"
              src={timeline.img2} // Replace with your actual image path
              alt="Image description"
            />
            <img
              className="w-2/3 h-2/3 object-cover"
              src={timeline.img3} // Replace with your actual image path
              alt="Image description"
            />
          </div>
        </div>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 whitespace-nowrap">
          {timeline.description}
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={timeline.primaryAction.href}
              className={
                'w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10'
              }
            >
              {timeline.primaryAction.text}
            </a>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              href={timeline.secondaryAction.href}
              className={
                'w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10'
              }
            >
              {timeline.secondaryAction.text}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TimelineDes;
