import React, { useState, useEffect } from 'react';

interface NumberGrowProps {
  value: number;
  duration: number;
}

const Number: React.FC<NumberGrowProps> = ({ value, duration }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const nextValue = Math.floor(progress * value);
      setDisplayValue(nextValue);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

export default Number;
