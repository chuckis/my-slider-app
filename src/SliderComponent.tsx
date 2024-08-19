import React, { useState } from 'react';

const SliderComponent: React.FC = () => {
  const [slider1, setSlider1] = useState<number>(50);
  const [slider2, setSlider2] = useState<number>(50);

  const handleSlider1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSlider1(newValue);
    setSlider2(100 - newValue);
  };

  const handleSlider2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSlider2(newValue);
    setSlider1(100 - newValue);
  };

  return (
    <div>
      <div>
        <label>Slider 1: {slider1}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={slider1}
          onChange={handleSlider1Change}
        />
      </div>
      <div>
        <label>Slider 2: {slider2}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={slider2}
          onChange={handleSlider2Change}
        />
      </div>
    </div>
  );
};

export default SliderComponent;
