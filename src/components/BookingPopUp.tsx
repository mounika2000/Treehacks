// BookingPopup.tsx

import 'reactjs-popup/dist/index.css'; // Import default stylesheet

// BookingPopup.tsx
import React from 'react';

interface BookingPopupProps {
  close: () => void; // Typing the 'close' function
}

const BookingPopup: React.FC<BookingPopupProps> = ({ close }) => {
  return (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header">Booking an Appointment with Your Pet Doctor</div>
      <div className="content">
        <label>
          Date:
          <input type="date" />
        </label>
        <label>
          Time:
          <input type="time" />
        </label>
      </div>
      <div className="actions">
        <button
          className="button"
          onClick={() => {
            console.log('Modal closed');
            close();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BookingPopup;
