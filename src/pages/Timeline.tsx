import React from 'react';

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';
import Header from '../components/Header';
import TimelineDes from '../components/TimelineDes';

function Experience() {
  return (
    <div className="experience max-w-7xl mx-auto">
      <div
        className={
          'relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'
        }
      >
        <Header />
        <TimelineDes />
      </div>

      <VerticalTimeline>
        {/* Morning Walk */}
        <VerticalTimelineElement
          className="vertical-timeline-element--activity"
          date="7:00 AM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Morning Walk</h3>
          <p>
            Start the day with a brisk walk to invigorate the senses and get
            those muscles moving.
          </p>
        </VerticalTimelineElement>

        {/* Breakfast */}
        <VerticalTimelineElement
          className="vertical-timeline-element--meal"
          date="8:00 AM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Breakfast Time</h3>
          <p>
            A nutritious start is key. A balanced meal for a day full of play!
          </p>
        </VerticalTimelineElement>

        {/* Play Time */}
        <VerticalTimelineElement
          className="vertical-timeline-element--activity"
          date="10:00 AM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Play Time</h3>
          <p>
            Fetch, tug, and toys! Engage your pet with fun activities to
            stimulate their mind and body.
          </p>
        </VerticalTimelineElement>

        {/* Midday Meal */}
        <VerticalTimelineElement
          className="vertical-timeline-element--meal"
          date="12:00 PM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Midday Meal</h3>
          <p>
            Time to refuel with a small meal to keep the energy levels up for
            the afternoon.
          </p>
        </VerticalTimelineElement>

        {/* Afternoon Walk */}
        <VerticalTimelineElement
          className="vertical-timeline-element--activity"
          date="3:00 PM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Afternoon Stroll</h3>
          <p>
            A leisurely walk to enjoy the outdoors and have some quality time
            together.
          </p>
        </VerticalTimelineElement>

        {/* Dinner Time */}
        <VerticalTimelineElement
          className="vertical-timeline-element--meal"
          date="6:00 PM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Dinner Time</h3>
          <p>
            A hearty meal to end the days adventures. Nows the time to settle
            down and relax.
          </p>
        </VerticalTimelineElement>

        {/* Evening Relaxation */}
        <VerticalTimelineElement
          className="vertical-timeline-element--activity"
          date="8:00 PM"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={
            <img
              alt="logo"
              className="h-16 w-auto sm:h-16"
              src={'/assets/images/logo2.png'}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">
            Evening Relaxation
          </h3>
          <p>
            Wind down with some gentle petting or a soft massage. A perfect end
            to a perfect day.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
