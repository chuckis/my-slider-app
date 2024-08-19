import React, { useState } from 'react';
import './SliderComponent.css';

const calculateVolume = (length: number, width: number, height: number): number => {
  return length * width * height;
};

const SliderComponent: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [volume, setVolume] = useState<number>(calculateVolume(length, width, height));

  const [isLengthEnabled, setIsLengthEnabled] = useState<boolean>(true);
  const [isWidthEnabled, setIsWidthEnabled] = useState<boolean>(true);
  const [isHeightEnabled, setIsHeightEnabled] = useState<boolean>(true);

 
  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setLength(newValue);
    setVolume(calculateVolume(newValue, width, height));
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setWidth(newValue);
    setVolume(calculateVolume(length, newValue, height));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setHeight(newValue);
    setVolume(calculateVolume(length, width, newValue));
  };

  return (
    <div className="slider-container">
      <div className="slider-section">
        <label>Длина: {length}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={length}
          onChange={handleLengthChange}
          disabled={!isLengthEnabled}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isLengthEnabled}
            onChange={() => setIsLengthEnabled(!isLengthEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="slider-section">
        <label>Ширина: {width}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={width}
          onChange={handleWidthChange}
          disabled={!isWidthEnabled}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isWidthEnabled}
            onChange={() => setIsWidthEnabled(!isWidthEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="slider-section">
        <label>Толщина: {height}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={height}
          onChange={handleHeightChange}
          disabled={!isHeightEnabled}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isHeightEnabled}
            onChange={() => setIsHeightEnabled(!isHeightEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="slider-section">
        <label>Объем: {volume}</label>
      </div>
    </div>
  );
};

export default SliderComponent;
