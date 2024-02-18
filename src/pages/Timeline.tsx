import React from 'react';

import WorkIcon from '@material-ui/icons/Work';
import axios from 'axios';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';
import Header from '../components/Header';
import TimelineDes from '../components/TimelineDes';

const scheduleAppointment = async () => {
  console.log('scheduled appointment');

  try {
    const response = await axios.get(
      'http://localhost:105/scheduleAppointment'
    );

    const { data } = response;

    // Check if data is not null or undefined
    if (data != null) {
      // Ensure setSummary is updating the state correctly
      console.log(data);
    } else {
      console.log('Blank response');
    }
  } catch (error) {
    console.error('Error fetching summary:', error);
  }
};

function Experience() {
  return (
    <div className="experience">
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
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon onClick={() => scheduleAppointment()} />}
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
          iconStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon />}
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
          iconStyle={{ background: 'rgb(255, 193, 7)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon />}
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
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon />}
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
          iconStyle={{ background: 'rgb(103, 58, 183)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon />}
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
          iconStyle={{ background: 'rgb(156, 39, 176)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon />}
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
          iconStyle={{ background: 'rgb(255, 87, 34)', color: '#fff' }}
          contentStyle={{
            background: '#f0f0f0',
            color: '#333',
            borderRadius: '4px',
          }}
          icon={<WorkIcon />}
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
