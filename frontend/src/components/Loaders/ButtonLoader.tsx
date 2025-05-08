import React from 'react';
import '@/styles/ButtonLoader.css';

interface IProps {
  size: number;
}

const ButtonLoader: React.FC<IProps> = ({ size }) => {
  return (
    <div className="button-loader-block">
      <div className="button-loader" style={{ width: size, height: size }} />
    </div>
  );
};

export default ButtonLoader;
