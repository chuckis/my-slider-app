import React, { useState, useEffect } from 'react';
import './SliderComponent.css'; // CSS для стилизации


const calculateVolume = (length: number, width: number, height: number): number => {
  return length * width * height;
};


const recalculateDimension = (volume: number, length: number, width: number, fixed: 'length' | 'width' | 'height'): number => {
  switch (fixed) {
    case 'length':
      return volume / (width * length);
    case 'width':
      return volume / (length * width);
    case 'height':
      return volume / (length * width);
    default:
      return 1;
  }
};

const SliderComponent: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [volume, setVolume] = useState<number>(calculateVolume(length, width, height));

  const [isLengthFixed, setIsLengthFixed] = useState<boolean>(false);
  const [isWidthFixed, setIsWidthFixed] = useState<boolean>(false);
  const [isHeightFixed, setIsHeightFixed] = useState<boolean>(false);
  const [isVolumeFixed, setIsVolumeFixed] = useState<boolean>(false);


  useEffect(() => {
    if (!isLengthFixed && !isWidthFixed && !isHeightFixed && !isVolumeFixed) {
      setVolume(calculateVolume(length, width, height));
    }
  }, [length, width, height]);

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = Number(event.target.value);
    if (!isLengthFixed) {
      setLength(newLength);

      if (isVolumeFixed) {
        setHeight(recalculateDimension(volume, newLength, width, 'length'));
      } else {
        setVolume(calculateVolume(newLength, width, height));
      }
    }
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(event.target.value);
    if (!isWidthFixed) {
      setWidth(newWidth);

      if (isVolumeFixed) {
        setHeight(recalculateDimension(volume, length, newWidth, 'width'));
      } else {
        setVolume(calculateVolume(length, newWidth, height));
      }
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(event.target.value);
    if (!isHeightFixed) {
      setHeight(newHeight);

      if (isVolumeFixed) {
        setWidth(recalculateDimension(volume, length, newHeight, 'height'));
      } else {
        setVolume(calculateVolume(length, width, newHeight));
      }
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    if (!isVolumeFixed) {
      setVolume(newVolume);

      if (isLengthFixed) {
        setHeight(recalculateDimension(newVolume, length, width, 'length'));
      } else if (isWidthFixed) {
        setHeight(recalculateDimension(newVolume, length, width, 'width'));
      } else if (isHeightFixed) {
        setWidth(recalculateDimension(newVolume, length, height, 'height'));
      } else {
      
        setHeight(newVolume / (length * width));
      }
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
          disabled={isLengthFixed}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isLengthFixed}
            onChange={() => setIsLengthFixed(!isLengthFixed)}
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
          disabled={isWidthFixed}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isWidthFixed}
            onChange={() => setIsWidthFixed(!isWidthFixed)}
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
          disabled={isHeightFixed}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isHeightFixed}
            onChange={() => setIsHeightFixed(!isHeightFixed)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="slider-section">
        <label>Объем: {volume}</label>
        <input
          type="range"
          min="1"
          max="100000"
          value={volume}
          onChange={handleVolumeChange}
          disabled={isVolumeFixed}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={isVolumeFixed}
            onChange={() => setIsVolumeFixed(!isVolumeFixed)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default SliderComponent;
