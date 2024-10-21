import React, { useEffect, useState } from 'react';

const TimeIntervalCountDown = ({ reservationStartTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const reservationDate = new Date(reservationStartTime);
      const diff = reservationDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(`00 : 00 : 00`);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const formatTime = (time) => time.toString().padStart(2, '0');
      
      setTimeLeft(`${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reservationStartTime]);

  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
};

export default TimeIntervalCountDown;
