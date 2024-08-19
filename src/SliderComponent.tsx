import React, { useState, useEffect } from 'react';
import './SliderComponent.css'; // CSS для стилизации

// Функция для вычисления объема
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
  const [isVolumeEnabled, setIsVolumeEnabled] = useState<boolean>(true);

  // Обновление объема при изменении длины, ширины или толщины, если изменение объема включено
  useEffect(() => {
    if (isVolumeEnabled) {
      setVolume(calculateVolume(length, width, height));
    }
  }, [length, width, height, isVolumeEnabled]);

  // Функции изменения ползунков
  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setLength(newValue);
    if (isVolumeEnabled) {
      setVolume(calculateVolume(newValue, width, height));
    }
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setWidth(newValue);
    if (isVolumeEnabled) {
      setVolume(calculateVolume(length, newValue, height));
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setHeight(newValue);
    if (isVolumeEnabled) {
      setVolume(calculateVolume(length, width, newValue));
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isVolumeEnabled) {
      setVolume(newValue);
    }
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
        <input
          type="range"
          min="1"
          max="100000" // диапазон изменен для отображения большего объема
          value={volume}
          onChange={handleVolumeChange}
          disabled={isVolumeEnabled}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isVolumeEnabled}
            onChange={() => setIsVolumeEnabled(!isVolumeEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default SliderComponent;
