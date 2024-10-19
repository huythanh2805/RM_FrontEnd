import React, { useEffect, useState } from 'react';



const TimeInterval = ({ reservationStartTime }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if( (new Date(reservationStartTime)).getTime() > (new Date().getTime()) ){
        return setElapsedTime(`00 : 00 : 00`);
      }
      const now = new Date();
      const reservationDate = new Date(reservationStartTime);
      const diff = now.getTime() - reservationDate.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const formatTime = (time) => time.toString().padStart(2, '0');
      
      setElapsedTime(`${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reservationStartTime]);

  return (
    <div>
      <p>{elapsedTime}</p>
    </div>
  );
};

export default TimeInterval;
